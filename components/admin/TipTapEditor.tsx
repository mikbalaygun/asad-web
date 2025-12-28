"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/cn";

interface TipTapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function TipTapEditor({ content, onChange, placeholder }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full rounded-lg",
                },
            }),
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "prose prose-invert prose-slate max-w-none min-h-[300px] p-4 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return (
            <div className="border border-slate-600 rounded-lg bg-slate-800 p-4 min-h-[300px] flex items-center justify-center">
                <span className="text-slate-400">Yükleniyor...</span>
            </div>
        );
    }

    return (
        <div className="border border-slate-600 rounded-lg bg-slate-800 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-slate-700 bg-slate-800/50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Kalın"
                >
                    <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="İtalik"
                >
                    <em>I</em>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Üstü Çizili"
                >
                    <s>S</s>
                </ToolbarButton>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Başlık 1"
                >
                    H1
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Başlık 2"
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Başlık 3"
                >
                    H3
                </ToolbarButton>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Madde İşareti"
                >
                    •
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Numaralı Liste"
                >
                    1.
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="Alıntı"
                >
                    &ldquo;
                </ToolbarButton>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                <ToolbarButton
                    onClick={() => {
                        const url = window.prompt("Resim URL'i girin:");
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    title="Resim Ekle"
                >
                    🖼️
                </ToolbarButton>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Geri Al"
                >
                    ↩
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Yinele"
                >
                    ↪
                </ToolbarButton>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />

            {/* Placeholder */}
            {editor.isEmpty && placeholder && (
                <div className="absolute top-[60px] left-4 text-slate-500 pointer-events-none">
                    {placeholder}
                </div>
            )}
        </div>
    );
}

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={cn(
                "px-2 py-1 rounded text-sm font-medium transition-colors",
                isActive
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {children}
        </button>
    );
}
