# Linux Command Explainer (AI)

A Chrome extension that explains Linux commands in simple English using a local Ollama AI model.

No Anthropic API key or cloud AI service is required. The command explanation is generated locally on your computer.

## Features

- Explain selected Linux commands from the browser
- Right-click a selected command and choose the explanation option
- Keyboard shortcut: `Alt+Shift+E`
- Uses local Ollama
- Uses a custom `linux-soc-teacher` model
- Beginner-friendly explanations
- Includes SOC/security context
- No command is executed by the extension

## Requirements

You need:

- Google Chrome or Chromium
- Ollama
- Linux/macOS/Windows
- About 2–3 GB of storage for the base model

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/roshaanshaikh28/linux-command-explainer.git
cd linux-command-explainer
```

### 2. Install Ollama

Install Ollama from the official website:

https://ollama.com/

Check that it works:

```bash
ollama --version
```

### 3. Download the base model

The custom model is based on `qwen2.5:3b`.

```bash
ollama pull qwen2.5:3b
```

### 4. Create the Linux SOC teacher model

The repository contains the `Modelfile` used to create the custom model.

Run:

```bash
ollama create linux-soc-teacher -f Modelfile
```

Check that it was created:

```bash
ollama list
```

You should see:

```text
linux-soc-teacher:latest
```

### 5. Allow Chrome extensions to access Ollama

Ollama normally allows local requests, but Chrome extensions need to be explicitly allowed.

Start Ollama with:

```bash
OLLAMA_ORIGINS="chrome-extension://*" ollama serve
```

Keep this terminal running while using the extension.

This allows Chrome extensions to communicate with the local Ollama server.

### 6. Load the Chrome extension

Open Chrome and go to:

```text
chrome://extensions
```

Then:

1. Enable **Developer mode**
2. Click **Load unpacked**
3. Select:

```text
linux-command-explainer/extension/linux-explainer
```

The extension should now appear in Chrome.

### 7. Configure the model

Open the extension's settings/options page.

Make sure the model is:

```text
linux-soc-teacher:latest
```

Save the settings.

## Usage

Select a Linux command on a webpage.

Then either:

- Right-click → explain the selected Linux command
- Use `Alt+Shift+E`

The extension sends the selected command to the local Ollama API:

```text
http://127.0.0.1:11434/api/chat
```

The command is processed locally.

## Example

Select:

```bash
sudo grep -i "failed password" /var/log/auth.log
```

The extension explains:

- What `sudo` does
- What `grep` does
- What `-i` means
- What text is being searched
- What the log file contains
- Why a SOC analyst may investigate the command
- Potential security risks

## Privacy

This project is designed to use local AI.

The extension does not require:

- Anthropic API keys
- OpenAI API keys
- Cloud AI accounts

Commands are sent to the local Ollama API running on the user's computer.

## Security

The extension explains commands but does not execute them.

Ollama runs locally on:

```text
127.0.0.1:11434
```

The setting:

```text
OLLAMA_ORIGINS="chrome-extension://*"
```

allows browser extensions to access the local Ollama API.

Because this allows Chrome extensions to access Ollama, only use it when you understand the local security implications.

For a more restrictive setup, Ollama can instead be configured to allow only a specific extension origin.

## Project Structure

```text
linux-command-explainer/
├── Modelfile
├── README.md
└── extension/
    └── linux-explainer/
        ├── background.js
        ├── commands.js
        ├── content.js
        ├── manifest.json
        ├── options.html
        ├── options.js
        ├── popup.html
        └── popup.js
```

## License

See the repository for the current license information.
