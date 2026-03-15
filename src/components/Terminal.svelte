<script lang="ts">
    import { onMount, tick } from 'svelte';

    // --- Data & Constants ---
    const RESUME_URL = "https://derzan.dev/resume.pdf";
    const HELP_BANNER = String.raw`
 ____            _    __       _ _  
|  _ \ ___  _ __| | _/ _| ___ | (_) ___   
| |_) / _ \| '__| __| |_ / _ \| | |/ _ \  
|  __/ (_) | |  | |_|  _| (_) | | | (_) | 
|_|   \___/|_|   \__|_|  \___/|_|_|\___/  `;

    const LOGO_ASCII = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣶⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣷⣦⣄⢀⣀⣠⣤⣴⣶⣶⣶⣶⣶⡦
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣦⡀⠈⠻⢿⣿⣿⣇⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣷⠀⠀⠀⠉⠙⠿⣿⣿⡿⠛⠛⠋⠉⠉⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢸⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢉⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⢨⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⣼⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢾⣿⣿⣿⣿⣿⣿⣗⣀⣠⣤⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣯⠉⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⡿⠿⠛⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣦⡀⠀⠀⢸⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡟⠀⠀⣀⣀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⣀⡀⠙⣿⡄⠀⢸⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠲⠶⠦⣤⣤⣴⣿⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⡇⠀⣿⣿⣿⣿⣿⣟⠉⠉⣽⣿⠀⢸⣿⡿⠀⣿⣿⡆⣾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠈⠁⢀⣰⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣧⣀⠀⢀⣴⣿⣿⣷⣿⣿⠶⠞⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⢩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠛⠛⠛⠓⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣶⣦⡀⠀⠀⠀⣠⣤⣄⠘⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⣠⣶⣶⣷⣦⡀⠀⠀⠐⠛⠛⠛⠛⠛⠃⠀⠀⠀⠋⠙⠛⠃⠸⣿⡗⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⢸⡿⠛⠋⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣀⡀⠀⠀⢀⣀⣼⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣦⠀⠀⠀⠀⠺⠿⠟⠛⠓⠀⠀⠛⠛⠻⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠸⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣀⣀⡀⠀⠀⠀⢀⣀⣀⣤⣶⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠉⠙⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠟⠉⠻⠛⠟⠛⠛⠋⠁⠀⠉⠉⠉⠙⠛⠛⠛⠛⠛⠻⠟⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

    const PROJECTS = [
        { 
            name: "Lichess Discord Bot", 
            desc: "Feature-rich Discord integration consuming the Lichess API.", 
            tags: ["Typescript", "Docker", "Sentry.io", "MongoDB"] 
        },
        { 
            name: "derzan.dev", 
            desc: "Personal Website.", 
            tags: ["React", "MaterialUI"] 
        },
        { 
            name: "Terminal Portfolio", 
            desc: "Interactive command-line portfolio.", 
            tags: ["Astro", "Svelte", "TypeScript"] 
        },
        { 
            name: "OSS Contributions", 
            desc: "Small PRs across a few different projects.", 
            tags: ["Python", "Javascript","Open Source"] 
        }
        
    ];

    // --- State ---
    let history: Array<{ id: number, html: string }> = [];
    let cmdHistory: string[] = [];
    let hIdx = -1;
    let inputValue = '';
    let inputDisabled = false;
    let nextId = 0;

    // --- DOM Refs ---
    let bufferRef: HTMLDivElement;
    let inputRef: HTMLInputElement;

    // --- Lifecycle ---
    onMount(async () => {
        printStatic("guest@portfolio: Login successful.", "text-[10px] opacity-40 mb-1");
        await new Promise(r => setTimeout(r, 200));
        printStatic("Welcome to the Terminal.", "cmd-header text-2xl mb-1");
        printStatic("Type 'help' to start.", "cmd-prompt italic text-sm mb-4");
        focusInput();
    });

    // --- Actions ---
    function focusInput() {
        if (inputRef && !inputDisabled) inputRef.focus();
    }

    async function scrollToBottom() {
        await tick();
        if (bufferRef) bufferRef.scrollTop = bufferRef.scrollHeight;
    }

    function printStatic(text: string, className = "") {
        history = [...history, { id: nextId++, html: `<div class="${className}">${text}</div>` }];
        scrollToBottom();
    }

    // Reactive typing effect
    async function typeLine(text: string, className = "", speed = 10) {
        let currentText = "";
        let id = nextId++;
        history = [...history, { id, html: `<div class="${className}"></div>` }];

        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            // Update only the specific line in the array
            history = history.map(h => h.id === id ? { ...h, html: `<div class="${className}">${currentText}</div>` } : h);
            await tick();
            scrollToBottom();
            await new Promise(r => setTimeout(r, speed));
        }
    }

    async function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            const cmd = inputValue.trim().toLowerCase();
            
            // Print user input to screen
            history = [...history, {
                id: nextId++,
                html: `<div class="flex gap-3 mb-2"><span class="cmd-prompt shrink-0">guest@portfolio:~$</span><span class="text-white">${inputValue}</span></div>`
            }];

            if (cmd) {
                cmdHistory = [cmd, ...cmdHistory];
                hIdx = -1;
                inputValue = '';
                inputDisabled = true;
                await runCommand(cmd);
                inputDisabled = false;
                await tick();
                focusInput();
            } else {
                inputValue = '';
            }
            scrollToBottom();
        } else if (e.key === 'ArrowUp') {
            if (hIdx < cmdHistory.length - 1) {
                hIdx++;
                inputValue = cmdHistory[hIdx];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (hIdx > 0) {
                hIdx--;
                inputValue = cmdHistory[hIdx];
            } else {
                hIdx = -1;
                inputValue = '';
            }
            e.preventDefault();
        } else if (e.ctrlKey && e.key === 'l') {
            history = [];
            e.preventDefault();
        }
    }

    // Handle clicks outside the terminal to keep focus
    function handleGlobalKeydown(e: KeyboardEvent) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            focusInput();
        }
    }

    async function runCommand(cmd: string) {
        switch (cmd) {
            case 'help':
                history = [...history, { id: nextId++, html: `
                    <div>
                        <pre class="ascii-banner">${HELP_BANNER}</pre>
                        <div class="cmd-out font-bold mb-2">Available commands:</div>
                        <div class="cmd-error">  about      - Developer biography</div>
                        <div class="cmd-error">  fastfetch - System specs</div>
                        <div class="cmd-error">  projects - Featured projects</div>
                        <div class="cmd-error">  resume   - Open standard resume in new tab</div>
                        <div class="cmd-error">  links    - Reach out & Socials</div>
                        <div class="cmd-error">  clear    - Flush terminal screen</div>
                    </div>
                `}];
                break;
            case 'fastfetch':
                history = [...history, { id: nextId++, html: `
                    <div class="fastfetch-layout">
                        <pre class="fastfetch-logo">${LOGO_ASCII}</pre>
                        <div class="space-y-1">
                            <div class="cmd-header mb-2 text-xl"><span class="cmd-prompt">guest</span><span class="cmd-out">@</span><span class="cmd-prompt">portfolio</span></div>
                            <div class="text-sm"><span class="cmd-keyword">OS:</span> macOS Sonoma 14.3.1 (23D60) arm64</div>
                            <div class="text-sm"><span class="cmd-keyword">Host:</span> MacBook Air (M1, 2020)</div>
                            <div class="text-sm"><span class="cmd-keyword">Kernel:</span> Darwin 23.3.0</div>
                            <div class="text-sm"><span class="cmd-keyword">Packages:</span> 159 (brew), 9 (brew-cask)</div>
                            <div class="text-sm"><span class="cmd-keyword">Shell:</span> zsh 5.9</div>
                            <div class="text-sm"><span class="cmd-keyword">Display (Color LCD):</span> 2880x1800 @ 2x in 13"</div>
                            <div class="text-sm"><span class="cmd-keyword">WM:</span> Quartz Compositor 1.600.0</div>
                            <div class="text-sm"><span class="cmd-keyword">Terminal:</span> iTerm 3.6.8</div>
                            <div class="text-sm"><span class="cmd-keyword">CPU:</span> Apple M1 (8) @ 3.20 GHz</div>
                            <div class="text-sm"><span class="cmd-keyword">GPU:</span> Apple M1 (7) [Integrated]</div>
                            <div class="text-sm"><span class="cmd-keyword">Memory:</span> 4832MiB / 8192MiB</div>
                            <div class="color-palette">
                                <div class="color-box" style="background: var(--black)"></div>
                                <div class="color-box" style="background: var(--red)"></div>
                                <div class="color-box" style="background: var(--green)"></div>
                                <div class="color-box" style="background: var(--yellow)"></div>
                                <div class="color-box" style="background: var(--blue)"></div>
                                <div class="color-box" style="background: var(--magenta)"></div>
                                <div class="color-box" style="background: var(--cyan)"></div>
                                <div class="color-box" style="background: var(--white)"></div>
                            </div>
                        </div>
                    </div>
                `}];
                break;
            case 'about':
                await typeLine("Computer Science student at Cleveland State University.", "cmd-header");
                await typeLine("Focused on Python, JavaScript, and open-source software development.");
                break;
            case 'projects':
                let projHTML = `<div class="cmd-header mb-2">Engineering Portfolio:</div>`;
                for (const p of PROJECTS) {
                    projHTML += `
                        <div class="cmd-out font-medium">• ${p.name.padEnd(20)} | ${p.desc}</div>
                        <div class="cmd-accent text-xs mb-3 opacity-90">  Tags: [${p.tags.join(", ")}]</div>
                    `;
                }
                history = [...history, { id: nextId++, html: `<div>${projHTML}</div>` }];
                break;
            case 'resume':
                history = [...history, { id: nextId++, html: `
                    <div>
                        <div class="cmd-out mb-1">Opening resume...</div>
                        <div class="cmd-accent text-xs">  Fallback link: <a href="${RESUME_URL}" class="cmd-green underline" target="_blank" rel="noopener noreferrer">Click to view manually</a></div>
                    </div>
                `}];
                // Programmatically open the resume in a new tab
                window.open(RESUME_URL, '_blank');
                break;
            case 'links':
                history = [...history, { id: nextId++, html: `
                    <div>
                        <div class="cmd-header mb-2">Contact Methods:</div>
                        <div>  Email:   d.chiang23@vikes.csuohio.edu</div>
                        <div>  GitHub:   <a href="https://github.com/MiTo0o" class="cmd-green underline" target="_blank" rel="noopener noreferrer">github.com/MiTo0o</a></div>
                        <div>  Website:   <a href="https://derzan.dev/" class="cmd-green underline" target="_blank" rel="noopener noreferrer">derzan.dev</a></div>
                        <div>  Linkedin:   <a href="https://www.linkedin.com/in/derzan/" class="cmd-green underline" target="_blank" rel="noopener noreferrer">linkedin.com/in/derzan</a></div>
                    </div>
                `}];
                break;
            case 'clear':
                history = [];
                break;
            default:
                printStatic(`zsh: command not found: ${cmd}`, "cmd-error");
        }
    }
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<div class="terminal-container" on:click={focusInput} role="presentation">
    <div bind:this={bufferRef} id="terminal-buffer" class="space-y-4">
        <div id="history">
            {#each history as item (item.id)}
                {@html item.html}
            {/each}
        </div>

        <div class="input-line">
            <span class="cmd-prompt shrink-0">guest@portfolio:~$</span>
            <input
                bind:this={inputRef}
                bind:value={inputValue}
                on:keydown={handleKeydown}
                disabled={inputDisabled}
                type="text"
                autocomplete="off"
                spellcheck="false"
                class="command-input"
            >
        </div>
    </div>
</div>

<style>
    .terminal-container {
        position: absolute;
        inset: 0;
        background: var(--bg-overlay);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        display: flex;
        flex-direction: column;
        padding: 2rem;
    }

    #terminal-buffer {
        flex: 1;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--selection-bg) transparent;
        padding-bottom: 5vh;
    }

    #terminal-buffer::-webkit-scrollbar { width: 8px; }
    #terminal-buffer::-webkit-scrollbar-track { background: transparent; }
    #terminal-buffer::-webkit-scrollbar-thumb { 
        background: var(--selection-bg); 
        border-radius: 4px; 
    }
    #terminal-buffer::-webkit-scrollbar-thumb:hover { background: var(--blue); }

    .input-line {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
    }

    .command-input {
        background: transparent;
        border: none;
        outline: none;
        flex: 1;
        color: var(--text-main);
        padding: 0;
        margin: 0;
        font-size: 1rem;
        font-family: 'JetBrains Mono', monospace;
        caret-color: var(--text-main);
    }

    /* Target injected HTML classes specifically in Svelte using :global() */
    :global(.ascii-banner) {
        line-height: 1.1;
        white-space: pre;
        color: var(--magenta);
        margin-bottom: 1rem;
        font-size: clamp(8px, 1.5vw, 14px);
    }

    /* Dedicated CSS for the fastfetch logo to prevent Tailwind from purging it */
    :global(.fastfetch-logo) {
        line-height: 1;
        white-space: pre;
        color: #33859e; /* cyan */
        margin: 0;
        font-size: 5px;
    }

    @media (min-width: 640px) {
        :global(.fastfetch-logo) { font-size: 6px; }
    }

    @media (min-width: 768px) {
        :global(.fastfetch-logo) { font-size: 8px; }
    }
    
    :global(.fastfetch-layout) {
        display: flex;
        gap: 3rem;
        align-items: flex-start;
        flex-wrap: wrap;
        margin: 1.5rem 0;
        background: transparent;
        padding: 1rem 0;
    }

    :global(.color-palette) {
        display: flex;
        gap: 0;
        margin-top: 1rem;
        border-radius: 4px;
        overflow: hidden;
    }

    :global(.color-box) { 
        width: 32px; 
        height: 20px; 
    }

    @media (max-width: 640px) {
        .terminal-container { padding: 1rem; }
        :global(.fastfetch-layout) { gap: 1rem; padding: 1rem 0; }
    }
</style>