/* ---------- Knowledge base: d = what it does, f = flags, s = sub-commands ---------- */
const CMD = {
  ls: { d: "Lists the files and folders inside a directory.", f: { "-l": "long format: permissions, owner, size, date", "-a": "show hidden files (names starting with a dot)", "-h": "human-readable sizes (KB, MB, GB)", "-t": "newest first", "-r": "reverse the order", "-R": "also list inside sub-folders" } },
  cd: { d: "Moves you into another folder (change directory)." },
  pwd: { d: "Prints the folder you are currently in." },
  cat: { d: "Prints a file's contents to the screen.", f: { "-n": "number each line" } },
  less: { d: "Opens a file so you can scroll through it. Press q to quit." },
  head: { d: "Shows the first lines of a file (10 by default).", f: { "-n": "how many lines to show" } },
  tail: { d: "Shows the last lines of a file (10 by default). Great for logs.", f: { "-n": "how many lines to show", "-f": "keep watching and print new lines as they are added (live log view)" } },
  grep: { d: "Searches text for a word or pattern and prints the matching lines.", f: { "-i": "ignore upper/lower case", "-r": "search inside all files in a folder", "-R": "search inside all files in a folder", "-v": "show lines that do NOT match", "-n": "show line numbers", "-c": "just count the matches", "-E": "use extended patterns (regex)", "-o": "print only the matching part", "-l": "list only the names of files that match", "-w": "match whole words only" } },
  find: { d: "Searches for files and folders by name, type, size, date and more.", f: { "-name": "match by file name", "-iname": "match by name, ignoring case", "-type": "f = files, d = folders", "-mtime": "modified N days ago", "-size": "match by size", "-user": "owned by this user", "-perm": "has these permissions", "-exec": "run another command on every match" } },
  cp: { d: "Copies a file or folder.", f: { "-r": "copy folders and everything inside", "-a": "copy exactly, keeping permissions and dates", "-v": "show what is being copied" } },
  mv: { d: "Moves or renames a file or folder." },
  rm: { d: "Deletes files. There is no recycle bin: gone is gone.", f: { "-r": "delete folders and everything inside", "-f": "force it, never ask questions", "-i": "ask before each delete", "-v": "show what is deleted" } },
  mkdir: { d: "Creates a new folder.", f: { "-p": "create the whole path, including missing parent folders" } },
  rmdir: { d: "Deletes an empty folder." },
  touch: { d: "Creates an empty file, or updates a file's 'last modified' time." },
  ln: { d: "Creates a link (shortcut) to a file.", f: { "-s": "symbolic (soft) link, like a shortcut" } },
  chmod: { d: "Changes who may read (r), write (w) or run (x) a file.", f: { "-R": "apply to everything inside a folder too" } },
  chown: { d: "Changes who owns a file (user and group).", f: { "-R": "apply to everything inside a folder too" } },
  sudo: { d: "Runs the command with administrator (root) power.", f: { "-u": "run as this other user instead of root", "-i": "open a full root shell", "-s": "open a shell as root" } },
  bash: { d: "Starts the Bash shell, or runs a script with it. When fed by a pipe, it runs whatever text arrives.", f: { "-c": "run this text as a command", "-i": "interactive shell" } },
  sh: { d: "Starts a basic shell, or runs a script with it. When fed by a pipe, it runs whatever text arrives.", f: { "-c": "run this text as a command" } },
  su: { d: "Switches to another user account (root by default)." },
  whoami: { d: "Prints the username you are logged in as." },
  id: { d: "Shows your user ID, group IDs and the groups you belong to." },
  who: { d: "Shows who is currently logged in." },
  w: { d: "Shows who is logged in and what they are doing right now." },
  last: { d: "Shows the history of successful logins and reboots." },
  lastb: { d: "Shows FAILED login attempts. Handy for spotting brute-force attacks." },
  passwd: { d: "Changes a user's password." },
  useradd: { d: "Creates a new user account.", f: { "-m": "also create a home folder", "-s": "set the user's login shell", "-G": "add to extra groups" } },
  usermod: { d: "Modifies an existing user account.", f: { "-aG": "ADD the user to a group (keeps existing groups)", "-L": "lock the account", "-U": "unlock the account" } },
  ps: { d: "Lists running programs (processes).", f: { "-e": "all processes", "-f": "full details (parent, start time, command)", "aux": "every process from every user, with CPU/memory use" } },
  top: { d: "Live view of running processes and CPU/memory use. Press q to quit." },
  htop: { d: "A friendlier live view of running processes." },
  kill: { d: "Sends a signal to a process, usually asking it to stop.", f: { "-9": "force-kill it immediately (it can't refuse)", "-15": "politely ask it to stop" } },
  pkill: { d: "Stops processes by name instead of by number." },
  lsof: { d: "Lists open files, including network connections, and which program uses them.", f: { "-i": "show network connections", "-p": "for this process ID" } },
  netstat: { d: "Shows network connections and listening ports (older tool; ss replaces it).", f: { "-t": "TCP connections", "-u": "UDP connections", "-l": "only listening ports", "-n": "show numbers, don't resolve names", "-p": "show which program owns each connection", "-a": "show all" } },
  ss: { d: "Shows network connections and listening ports (modern replacement for netstat).", f: { "-t": "TCP", "-u": "UDP", "-l": "only listening ports", "-n": "show numbers, don't resolve names", "-p": "show which program owns each connection", "-a": "show all" } },
  ip: { d: "Shows or changes network settings.", s: { a: "addresses: IP addresses of each network card", addr: "addresses: IP addresses of each network card", r: "routes: where traffic is sent", route: "routes: where traffic is sent", link: "the network cards themselves (up/down, MAC address)", neigh: "the ARP table: nearby devices and their MAC addresses" } },
  ifconfig: { d: "Shows network card settings and IP addresses (older tool; ip replaces it)." },
  ping: { d: "Checks whether another machine is reachable and how fast it replies.", f: { "-c": "send only this many packets, then stop" } },
  traceroute: { d: "Shows each hop (router) your traffic passes through to reach a destination." },
  dig: { d: "Asks DNS servers what IP address a domain name points to (and other DNS records).", f: { "+short": "show only the answer" } },
  nslookup: { d: "Looks up DNS records for a domain name." },
  curl: { d: "Fetches data from a URL (web page, API, file).", f: { "-s": "silent: hide the progress bar", "-o": "save output to a file with this name", "-O": "save using the file's original name", "-L": "follow redirects", "-I": "headers only", "-X": "choose the HTTP method (GET, POST...)", "-d": "send this data in the request", "-H": "add a custom header", "-k": "ignore SSL certificate errors (insecure)", "-v": "verbose: show full conversation" } },
  wget: { d: "Downloads a file from a URL.", f: { "-O": "save under this name", "-q": "quiet", "-r": "download recursively (a whole site)" } },
  ssh: { d: "Opens a secure remote terminal on another machine.", f: { "-i": "use this private key file to log in", "-p": "connect to this port", "-L": "forward a local port through the connection (tunnel)", "-D": "create a SOCKS proxy through the connection" } },
  scp: { d: "Copies files to or from another machine over SSH.", f: { "-r": "copy folders too", "-P": "use this port", "-i": "use this key file" } },
  nc: { d: "Netcat: reads/writes data over network connections. Used for testing ports, transfers, and (by attackers) shells.", f: { "-l": "listen for incoming connections", "-v": "verbose", "-z": "just scan, send no data", "-e": "run a program on connect (classic reverse-shell trick)" } },
  nmap: { d: "Scans a machine or network to find open ports and running services.", f: { "-sV": "detect service versions", "-sS": "stealthy SYN scan", "-p": "which ports to scan", "-p-": "scan ALL 65535 ports", "-A": "aggressive: OS, versions, scripts", "-O": "guess the operating system", "-Pn": "skip the 'is it up?' check", "-sn": "just find live hosts, no port scan" } },
  tcpdump: { d: "Captures and prints network traffic as it passes by.", f: { "-i": "which network interface to listen on", "-n": "don't resolve names", "-w": "save capture to a file (open later in Wireshark)", "-r": "read a saved capture file", "-c": "stop after this many packets" } },
  tar: { d: "Bundles many files into one archive, and unpacks them again.", f: { "-x": "extract", "-c": "create an archive", "-z": "gzip compression", "-j": "bzip2 compression", "-v": "show files as they are processed", "-f": "the archive file name comes next", "-t": "list contents without extracting", "xzvf": "extract a gzip-compressed archive" } },
  gzip: { d: "Compresses a file into .gz.", f: { "-d": "decompress" } },
  gunzip: { d: "Decompresses .gz files." },
  zip: { d: "Compresses files into a .zip archive." },
  unzip: { d: "Extracts a .zip archive." },
  df: { d: "Shows how much disk space is used and free.", f: { "-h": "human-readable sizes" } },
  du: { d: "Shows how much space files and folders take up.", f: { "-h": "human-readable sizes", "-s": "show only the total", "-a": "include files, not just folders" } },
  free: { d: "Shows memory (RAM) used and free.", f: { "-h": "human-readable sizes", "-m": "in megabytes" } },
  uname: { d: "Prints system info: kernel, hostname, architecture.", f: { "-a": "print everything" } },
  uptime: { d: "Shows how long the system has been running and how busy it is." },
  hostname: { d: "Shows (or sets) the machine's name." },
  history: { d: "Lists the commands previously typed in this shell." },
  echo: { d: "Prints text to the screen. Often used to write text into files or pipe it elsewhere." },
  man: { d: "Opens the manual page for a command. Press q to quit." },
  which: { d: "Shows where a command's program file lives." },
  file: { d: "Tells you what type a file really is, whatever its extension says." },
  strings: { d: "Pulls readable text out of a binary file. Useful for analysing suspicious programs." },
  base64: { d: "Encodes data into base64 text, or decodes it back.", f: { "-d": "decode", "--decode": "decode", "-w": "line wrap width (0 = no wrapping)" } },
  md5sum: { d: "Calculates a file's MD5 fingerprint (hash). Used to check integrity or look up malware." },
  sha256sum: { d: "Calculates a file's SHA-256 fingerprint (hash). Used to verify files or look them up on VirusTotal." },
  sort: { d: "Sorts lines of text.", f: { "-n": "sort numerically", "-r": "reverse order", "-u": "remove duplicates", "-k": "sort by this column" } },
  uniq: { d: "Collapses repeated neighbouring lines (usually used after sort).", f: { "-c": "count how many times each line appears", "-d": "show only duplicated lines" } },
  wc: { d: "Counts lines, words and characters.", f: { "-l": "count lines" , "-w": "count words", "-c": "count bytes" } },
  cut: { d: "Cuts out chosen columns from each line.", f: { "-d": "the character that separates columns", "-f": "which column(s) to keep", "-c": "which characters to keep" } },
  awk: { d: "A mini programming language for slicing text by column and filtering lines. E.g. print column 1: awk '{print $1}'.", f: { "-F": "the character that separates columns" } },
  sed: { d: "Finds and replaces text in a stream or file. E.g. sed 's/old/new/g'.", f: { "-i": "edit the file in place (changes it for real)", "-n": "print only lines you ask for", "-e": "run this script" } },
  tr: { d: "Translates or deletes characters (e.g. lowercase to uppercase)." },
  tee: { d: "Prints output on screen AND saves it to a file at the same time.", f: { "-a": "append instead of overwriting" } },
  xargs: { d: "Takes a list from the previous command and feeds it as arguments to another command." },
  diff: { d: "Shows the differences between two files." },
  systemctl: { d: "Starts, stops and checks background services.", s: { start: "start the service now", stop: "stop the service now", restart: "stop then start the service", status: "show whether it is running", enable: "make it start automatically at boot", disable: "stop it starting at boot", "list-units": "list loaded services" } },
  service: { d: "Starts, stops and checks background services (older style)." },
  journalctl: { d: "Reads the system logs kept by systemd.", f: { "-u": "only logs of this service", "-f": "follow live", "-n": "show the last N lines", "--since": "only logs after this time", "-xe": "jump to the end with extra explanations" } },
  crontab: { d: "Views or edits scheduled (recurring) jobs. Attackers use it for persistence.", f: { "-l": "list the scheduled jobs", "-e": "edit them", "-r": "remove ALL of them" } },
  apt: { d: "Installs, updates and removes software on Debian/Ubuntu.", s: { install: "install a package", remove: "uninstall a package", update: "refresh the list of available packages", upgrade: "upgrade installed packages", search: "search for packages" } },
  dd: { d: "Copies raw data block by block. Used for disk images, and can wipe disks if aimed wrong.", f: { "if=": "input: where to read from", "of=": "output: where to write to", "bs=": "block size" } },
  dmesg: { d: "Shows kernel messages (hardware, drivers, boot events)." },
  mount: { d: "Attaches a disk or drive to a folder so you can use it." },
  python3: { d: "Runs a Python script, or opens Python if no file is given.", f: { "-m": "run a built-in module (e.g. python3 -m http.server starts a quick web server)", "-c": "run this one-liner of Python" } },
  git: { d: "Version control: tracks changes to code.", s: { clone: "download a copy of a repository", pull: "fetch and merge the latest changes", push: "upload your commits", commit: "save a snapshot of your changes", status: "show what has changed", log: "show history" } },
  ufw: { d: "Simple firewall manager on Ubuntu.", s: { allow: "allow traffic", deny: "block traffic", enable: "turn the firewall on", status: "show current rules" } },
  iptables: { d: "Controls the Linux firewall rules.", f: { "-L": "list rules", "-A": "append a rule", "-D": "delete a rule", "-F": "flush (delete) all rules", "-j": "what to do: ACCEPT, DROP, REJECT" } }
};

const REDIR = {
  ">": "write the output INTO this file (overwrites it)",
  ">>": "add the output to the END of this file",
  "<": "read input FROM this file",
  "2>": "send error messages to this file",
  "2>&1": "merge error messages into normal output",
  "&>": "send both output and errors to this file",
  "/dev/null": "the 'black hole': anything sent here is thrown away"
};
const JOIN = {
  "|": "pipe: feed the output of the left command into the right command",
  "&&": "run the next command ONLY if the previous one succeeded",
  "||": "run the next command ONLY if the previous one failed",
  ";": "then run the next command regardless"
};

const WARN = [
  [/\brm\s+(-\w*r\w*f|-\w*f\w*r|-r\s+-f|-f\s+-r)/, "Deletes recursively AND forcefully with no confirmation. Double-check the path before running."],
  [/\bchmod\s+(-R\s+)?777/, "777 lets EVERYONE read, write and run the file. Usually a security risk."],
  [/(curl|wget)[^|;]*\|\s*(sudo\s+)?(ba|z)?sh/, "Downloads a script and runs it immediately without you reading it. Attackers love this pattern."],
  [/\bbase64\s+(-d|--decode)/, "Decoding base64 text. Malware often hides commands this way, so decode and read before running."],
  [/\/dev\/tcp\/|\bnc\b.*\s-e\s|\bbash\s+-i\b/, "This looks like a REVERSE SHELL pattern: a machine connecting back to give someone remote control."],
  [/\bdd\b.*\bof=\/dev\/(sd|nvme|hd)/, "Writes raw data straight onto a disk. A wrong target can wipe the drive."],
  [/:\(\)\s*\{/, "This is a fork bomb: it spawns processes until the machine freezes."],
  [/\bsudo\b/, "Runs with admin power, so mistakes (or malicious commands) have more impact."],
  [/\bcrontab\b|\/etc\/cron/, "Cron runs tasks automatically. Attackers use it to keep access after a reboot (persistence)."],
  [/\bcurl\b.*\s-k\b|\bcurl\b.*--insecure/, "-k turns off certificate checks, which removes protection against fake servers."],
  [/\/etc\/shadow/, "This file holds password hashes: sensitive, and a common attacker target."],
  [/\.ssh\/authorized_keys/, "Controls who can log in over SSH. Attackers add their own key here to keep access."]
];

/* ---------- Parser ---------- */
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

function splitSegments(input) {
  const out = []; let cur = ""; let q = null;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (q) { cur += c; if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    const two = input.substr(i, 2);
    if (two === "&&" || two === "||") { out.push(cur, two); cur = ""; i++; continue; }
    if (c === "|" || c === ";") { out.push(cur, c); cur = ""; continue; }
    cur += c;
  }
  out.push(cur);
  return out.map(s => s.trim()).filter(Boolean);
}

function explainSegment(seg) {
  let tokens = seg.match(/"[^"]*"|'[^']*'|\S+/g) || [];
  const parts = [];
  while (tokens.length && /^\w+=/.test(tokens[0])) { parts.push([tokens[0], "sets an environment variable for this command"]); tokens.shift(); }
  if (tokens[0] === "sudo") {
    parts.push(["sudo", CMD.sudo.d]); tokens.shift();
    while (tokens[0] && tokens[0].startsWith("-")) { const t = tokens.shift(); parts.push([t, CMD.sudo.f[t] || "sudo option"]); if (t === "-u") { const u = tokens.shift(); if (u) parts.push([u, "the user to run as"]); } }
  }
  const name = tokens.shift();
  if (!name) return { seg, known: false, summary: "Nothing to explain here.", parts };
  const base = name.replace(/^.*\//, "");
  const info = CMD[base];
  if (!info) return { seg, cmd: name, known: false, summary: "I don't have this one in my built-in list yet.", parts };
  parts.push([name, info.d]);
  const flags = info.f || {}, subs = info.s || {};
  for (const t of tokens) {
    if (REDIR[t]) { parts.push([t, REDIR[t]]); continue; }
    const rm = Object.keys(REDIR).find(r => t.startsWith(r) && r.length > 1 && r !== "2>&1" && t.length > r.length);
    if (rm) { parts.push([t, REDIR[rm] + " (" + t.slice(rm.length) + ")"]); continue; }
    const eq = t.split("=")[0] + (t.includes("=") ? "=" : "");
    if (flags[t]) parts.push([t, flags[t]]);
    else if (flags[eq]) parts.push([t, flags[eq]]);
    else if (t.startsWith("--")) parts.push([t, "an option for " + base + " (not in my list)"]);
    else if (/^-[A-Za-z0-9]{2,}$/.test(t)) {
      parts.push([t, "several short options combined:"]);
      for (const ch of t.slice(1)) parts.push(["  -" + ch, flags["-" + ch] || "(not in my list)"]);
    } else if (t.startsWith("-") && t.length > 1) parts.push([t, "an option for " + base + " (not in my list)"]);
    else if (subs[t]) parts.push([t, subs[t]]);
    else parts.push([t, "input/target: what the command works on"]);
  }
  return { seg, cmd: name, known: true, summary: info.d, parts };
}

function explain(raw) {
  const input = raw.replace(/^\s*[$#>]\s+/, "").trim();
  const items = splitSegments(input).map(s => JOIN[s] ? { join: JOIN[s] } : explainSegment(s));
  const warnings = WARN.filter(([re]) => re.test(input)).map(w => w[1]);
  return { input, items, warnings };
}

/* ---------- Rendering (shared by popup and on-page card) ---------- */
const CARD_CSS = `
  .card{font:14px/1.5 system-ui,Segoe UI,Arial,sans-serif;color:#1b1f24;background:#fff}
  code{font-family:ui-monospace,Menlo,Consolas,monospace;background:#eef1f5;padding:1px 5px;border-radius:4px;font-size:12.5px}
  .seg{border-left:3px solid #3b82f6;padding:4px 10px;margin:10px 0;background:#f7faff;border-radius:0 6px 6px 0}
  .seg h4{margin:0 0 4px;font-size:13px}
  .sum{margin:0 0 6px}
  .p{display:flex;gap:8px;margin:3px 0}.p code{flex:0 0 auto;max-width:45%;overflow-wrap:anywhere;align-self:flex-start}
  .join{text-align:center;color:#64748b;font-size:12px;margin:2px 0}
  .warn{background:#fff4e5;border-left:3px solid #f59e0b;padding:6px 10px;margin:8px 0;border-radius:0 6px 6px 0;font-size:13px}
  .unk{margin:6px 0;font-size:13px} a{color:#2563eb}
  .aihead{font-weight:600;margin:10px 0 4px}
  .ai{white-space:pre-wrap;background:#f0fdf4;border-left:3px solid #22c55e;padding:8px 10px;border-radius:0 6px 6px 0;font-size:13px;min-height:20px}
  .err{color:#b91c1c}
`;
function renderHTML(res) {
  let h = "";
  for (const it of res.items) {
    if (it.join) { h += `<div class="join">↓ ${esc(it.join)}</div>`; continue; }
    h += `<div class="seg"><h4><code>${esc(it.seg)}</code></h4>`;
    if (it.known) h += `<p class="sum"><b>In short:</b> ${esc(it.summary)}</p>`;
    else h += `<p class="unk">${esc(it.summary)} Try <a target="_blank" rel="noopener" href="https://explainshell.com/explain?cmd=${encodeURIComponent(it.seg)}">explainshell.com</a> or <a target="_blank" rel="noopener" href="https://man7.org/linux/man-pages/dosearch.html?q=${encodeURIComponent(it.cmd || it.seg)}">the man pages</a>.</p>`;
    for (const [t, m] of it.parts) if (!(it.known && t === it.cmd && m === it.summary)) h += `<div class="p"><code>${esc(t)}</code><span>${esc(m)}</span></div>`;
    h += `</div>`;
  }
  for (const w of res.warnings) h += `<div class="warn">⚠️ <b>Heads-up:</b> ${esc(w)}</div>`;
  return h || "<p>Nothing to explain.</p>";
}


/* ---------- Live AI explanation (streams in as the model writes it) ---------- */
function startAI(text, el) {
  el.innerHTML = "<i>Thinking…</i>";
  let acc = "";
  const port = chrome.runtime.connect({ name: "ai" });
  port.onMessage.addListener((m) => {
    if (m.type === "delta") { acc += m.text; el.textContent = acc; }
    else if (m.type === "error") {
      el.innerHTML = '<span class="err">' + esc(m.message) + '</span> <a href="#" class="opt">Open settings</a>';
      el.querySelector(".opt").onclick = (e) => { e.preventDefault(); chrome.runtime.sendMessage({ type: "open-options" }); };
    }
  });
  port.postMessage({ text });
  return port;
}
