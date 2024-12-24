import { NextResponse } from 'next/server';

let tasks = [];

export async function GET() {
    return NextResponse.json(tasks);
}

export async function POST(req) {
    const { text } = await req.json();
    const newTask = { id: Date.now(), text };
    tasks.push(newTask);
    return NextResponse.json(newTask);
}

export async function DELETE(req) {
    const id = Number(new URL(req.url).searchParams.get('id'));
    tasks = tasks.filter((task) => task.id !== id);
    return NextResponse.json({ success: true });
}
