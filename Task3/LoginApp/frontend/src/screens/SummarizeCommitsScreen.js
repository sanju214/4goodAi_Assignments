import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Picker,
  ScrollView,
} from "react-native";
import axios from "axios";

// Get the appropriate base URL based on platform
const getBaseUrl = () => {
  if (Platform.OS === "web") {
    return "http://localhost:5000"; // Use localhost for web
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:5000"; // Use 10.0.2.2 for Android emulator
  }
  return "http://localhost:5000"; // Default for iOS
};

// Create axios instance with custom config
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const SummarizeCommitsScreen = () => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [model, setModel] = useState("grok-2-1212"); // Default model
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!owner || !repo) {
      setError("Please enter both owner and repository name");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      console.log("Making request to:", `${api.defaults.baseURL}/summarize-commits`);
      console.log("Request payload:", { owner, repo, model });

      const response = await api.post("/summarize-commits", {
        owner,
        repo,
        model, // Send the selected model to the backend
      });

      console.log("Response received:", response.data);

      if (response.data && response.data.success) {
        setSummary(response.data.summary);
      } else {
        throw new Error(response.data?.message || "Invalid response format from server");
      }
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage;
      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response?.status === 404) {
        errorMessage = "Repository not found. Please check the owner and repository name.";
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else {
        errorMessage = "An error occurred while summarizing commits. Please try again.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summarize GitHub Commits</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="GitHub Owner (e.g., facebook)"
          value={owner}
          onChangeText={setOwner}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Repository Name (e.g., react)"
          value={repo}
          onChangeText={setRepo}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Picker
          selectedValue={model}
          onValueChange={(itemValue) => setModel(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Grok Model 2" value="grok-2-1212" />
          <Picker.Item label="Grok Vision Model 2" value="grok-2-vision-1212" />
          <Picker.Item label="Grok Beta" value="grok-beta" />
          <Picker.Item label="Grok Vision Beta" value="grok-vision-beta" />
        </Picker>

        <Button
          title="Summarize Commits"
          onPress={handleSummarize}
          disabled={loading || !owner || !repo}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>
              Fetching and summarizing commits... This may take a moment.
            </Text>
          </View>
        )}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}

        {summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Commit Summary:</Text>
            <ScrollView style={styles.scrollableSummary}>
              <Text style={styles.summary}>{summary}</Text>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff3f3",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  scrollableSummary: {
    maxHeight: 200, // Set maximum height to enable scrolling
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SummarizeCommitsScreen;
