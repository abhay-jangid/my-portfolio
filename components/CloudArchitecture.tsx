"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import { Terminal, CheckCircle2, Cpu, Cloud, Layers } from "lucide-react";

interface PipelineStage {
  id: string;
  stepNumber: string;
  name: string;
  category: string;
  badge: string;
  status: string;
  statusColor: string;
  icon: React.ElementType;
  summary: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
    progress: number;
  }[];
  specifications: string[];
  components: {
    name: string;
    type: string;
    state: string;
  }[];
  codeConfig: {
    filename: string;
    language: string;
    code: string;
    highlightedHtml: string;
  };
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "local-dev",
    stepNumber: "01",
    name: "Local Dev & Version Control",
    category: "FOUNDATION LAYER",
    badge: "GIT // FEATURE BRANCHING",
    status: "SYNCHRONIZED",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    icon: Terminal,
    summary:
      "Strict local developer workflows with TypeScript type-checking, ESLint/Prettier code formatting, atomic Git commits, and protected main branch merges.",
    metrics: [
      { label: "Type Safety Coverage", value: "100%", subtext: "Zero `any` escapes", progress: 100 },
      { label: "Linting & Formatter", value: "Strict ESLint", subtext: "Auto-fix on pre-commit", progress: 95 },
      { label: "Branch Protocol", value: "Feature / PR", subtext: "Peer review required", progress: 90 },
      { label: "Dev Server Speed", value: "< 400ms", subtext: "Turbopack Fast Refresh", progress: 98 },
    ],
    specifications: [
      "Strict TypeScript 5.x Compiler Settings (noImplicitAny, strictNullChecks)",
      "Husky Pre-commit Hooks for Lint-Staged Automated Validation",
      "Conventional Git Commit Message Formatting (feat, fix, refactor)",
      "Isolated Local Environment Variables (.env.local)",
    ],
    components: [
      { name: "Frontend Core", type: "Next.js 14 App Router + React 18", state: "Active" },
      { name: "Scripting Engine", type: "Python 3.11 + OpenCV", state: "Ready" },
      { name: "Audio Engine", type: "Web Audio API + AudioContext", state: "Synced" },
      { name: "Version Control", type: "Git 2.44 with SSH Signing", state: "Clean" },
    ],
    codeConfig: {
      filename: "package.json",
      language: "json",
      code: `{
  "name": "abhay-portfolio",
  "version": "2.4.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.16.6",
    "framer-motion": "^11.1.7",
    "next": "14.2.35",
    "react": "^18.3.1",
    "three": "^0.164.1"
  }
}`,
      highlightedHtml: `<span class="text-slate-400">{</span>
  <span class="text-cyan-400">"name"</span>: <span class="text-amber-300">"abhay-portfolio"</span>,
  <span class="text-cyan-400">"version"</span>: <span class="text-amber-300">"2.4.0"</span>,
  <span class="text-cyan-400">"private"</span>: <span class="text-violet-400">true</span>,
  <span class="text-cyan-400">"scripts"</span>: <span class="text-slate-400">{</span>
    <span class="text-cyan-400">"dev"</span>: <span class="text-amber-300">"next dev"</span>,
    <span class="text-cyan-400">"build"</span>: <span class="text-amber-300">"next build"</span>,
    <span class="text-cyan-400">"start"</span>: <span class="text-amber-300">"next start"</span>,
    <span class="text-cyan-400">"lint"</span>: <span class="text-amber-300">"next lint"</span>,
    <span class="text-cyan-400">"type-check"</span>: <span class="text-amber-300">"tsc --noEmit"</span>
  <span class="text-slate-400">}</span>,
  <span class="text-cyan-400">"dependencies"</span>: <span class="text-slate-400">{</span>
    <span class="text-cyan-400">"@react-three/drei"</span>: <span class="text-amber-300">"^9.105.6"</span>,
    <span class="text-cyan-400">"@react-three/fiber"</span>: <span class="text-amber-300">"^8.16.6"</span>,
    <span class="text-cyan-400">"framer-motion"</span>: <span class="text-amber-300">"^11.1.7"</span>,
    <span class="text-cyan-400">"next"</span>: <span class="text-amber-300">"14.2.35"</span>,
    <span class="text-cyan-400">"react"</span>: <span class="text-amber-300">"^18.3.1"</span>,
    <span class="text-cyan-400">"three"</span>: <span class="text-amber-300">"^0.164.1"</span>
  <span class="text-slate-400">}</span>
<span class="text-slate-400">}</span>`,
    },
  },
  {
    id: "cicd-automation",
    stepNumber: "02",
    name: "Automated CI/CD Workflows",
    category: "PIPELINE AUTOMATION",
    badge: "GITHUB ACTIONS",
    status: "AUTOMATED",
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]",
    icon: Cpu,
    summary:
      "Continuous Integration & Continuous Deployment pipeline executing automated build tests, static type verification, and Trivy container vulnerability scanning on every pull request.",
    metrics: [
      { label: "Pipeline Duration", value: "54s", subtext: "Cached dependency layers", progress: 85 },
      { label: "Build Pass Rate", value: "99.4%", subtext: "Zero broken main releases", progress: 99 },
      { label: "Security Audit", value: "0 Vulnerabilities", subtext: "Trivy & npm audit", progress: 100 },
      { label: "CD Deployment", value: "Automated SSH", subtext: "Triggered on main push", progress: 95 },
    ],
    specifications: [
      "Automated Dependency Caching (actions/cache for npm / node_modules)",
      "Strict Multi-step Job Matrix: Lint -> TypeCheck -> Build -> SecurityScan",
      "Encrypted GitHub Repository Secrets for Production SSH Keys",
      "Zero-downtime Remote Deployment via SSH Script Execution",
    ],
    components: [
      { name: "job: validate", type: "Type check & ESLint", state: "Passing" },
      { name: "job: build-test", type: "Next.js Production Compile", state: "Passing" },
      { name: "job: security", type: "Trivy Vulnerability Scanner", state: "Passing" },
      { name: "job: deploy-vps", type: "SSH Automation & Reload", state: "Ready" },
    ],
    codeConfig: {
      filename: ".github/workflows/ci-cd.yml",
      language: "yaml",
      code: `name: DevOps CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install & Typecheck
        run: |
          npm ci
          npm run type-check
          npm run lint

      - name: Production Build Verification
        run: npm run build`,
      highlightedHtml: `<span class="text-cyan-400">name</span>: <span class="text-amber-300">DevOps CI/CD Pipeline</span>

<span class="text-cyan-400">on</span>:
  <span class="text-cyan-400">push</span>:
    <span class="text-cyan-400">branches</span>: [<span class="text-amber-300">main</span>]
  <span class="text-cyan-400">pull_request</span>:
    <span class="text-cyan-400">branches</span>: [<span class="text-amber-300">main</span>]

<span class="text-cyan-400">jobs</span>:
  <span class="text-violet-400">validate-and-build</span>:
    <span class="text-cyan-400">runs-on</span>: <span class="text-amber-300">ubuntu-latest</span>
    <span class="text-cyan-400">steps</span>:
      - <span class="text-cyan-400">name</span>: <span class="text-amber-300">Checkout Source</span>
        <span class="text-cyan-400">uses</span>: <span class="text-amber-300">actions/checkout@v4</span>

      - <span class="text-cyan-400">name</span>: <span class="text-amber-300">Setup Node.js 20</span>
        <span class="text-cyan-400">uses</span>: <span class="text-amber-300">actions/setup-node@v4</span>
        <span class="text-cyan-400">with</span>:
          <span class="text-cyan-400">node-version</span>: <span class="text-violet-400">20</span>
          <span class="text-cyan-400">cache</span>: <span class="text-amber-300">"npm"</span>

      - <span class="text-cyan-400">name</span>: <span class="text-amber-300">Install & Typecheck</span>
        <span class="text-cyan-400">run</span>: <span class="text-slate-300">|</span>
          <span class="text-amber-200">npm ci</span>
          <span class="text-amber-200">npm run type-check</span>
          <span class="text-amber-200">npm run lint</span>

      - <span class="text-cyan-400">name</span>: <span class="text-amber-300">Production Build Verification</span>
        <span class="text-cyan-400">run</span>: <span class="text-amber-200">npm run build</span>`,
    },
  },
  {
    id: "containerization",
    stepNumber: "03",
    name: "Docker Containerization",
    category: "CONTAINER RUNTIME",
    badge: "DOCKER ENGINE",
    status: "STANDALONE",
    statusColor: "text-violet-400 border-violet-500/30 bg-violet-500/10 shadow-[0_0_12px_rgba(139,92,246,0.2)]",
    icon: Layers,
    summary:
      "Microservice packaging using multi-stage Dockerfiles, minimal Node.js Alpine base images, non-root user execution, and standalone static asset distribution.",
    metrics: [
      { label: "Docker Image Size", value: "48.2 MB", subtext: "Multi-stage Alpine base", progress: 18 },
      { label: "Container Memory", value: "118 MB", subtext: "Next.js Standalone Mode", progress: 24 },
      { label: "Startup Latency", value: "< 1.2s", subtext: "Instant warm boot", progress: 96 },
      { label: "Process Isolation", value: "Non-Root UID 1001", subtext: "Hardened runtime", progress: 100 },
    ],
    specifications: [
      "Multi-stage Build Pipeline: deps -> builder -> runner",
      "Next.js `output: 'standalone'` reducing image footprint by 80%",
      "Security-hardened non-root `nodejs:nextjs` user execution",
      "Docker Healthcheck monitoring with automatic restart policies",
    ],
    components: [
      { name: "web-runner", type: "Node 20 Alpine Standalone", state: "Healthy" },
      { name: "image-layer", type: "Optimized Multi-stage Cache", state: "Optimized" },
      { name: "port-mapping", type: "127.0.0.1:3000 -> Internal 3000", state: "Bound" },
      { name: "healthcheck", type: "HTTP 200 Probe /api/health", state: "Passing" },
    ],
    codeConfig: {
      filename: "Dockerfile",
      language: "dockerfile",
      code: `FROM node:20-alpine AS base

# Stage 1: Install Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build Application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Lightweight Production Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      highlightedHtml: `<span class="text-violet-400">FROM</span> <span class="text-amber-300">node:20-alpine</span> <span class="text-violet-400">AS</span> base

<span class="text-slate-500"># Stage 1: Install Dependencies</span>
<span class="text-violet-400">FROM</span> base <span class="text-violet-400">AS</span> deps
<span class="text-cyan-400">WORKDIR</span> /app
<span class="text-cyan-400">COPY</span> package*.json ./
<span class="text-cyan-400">RUN</span> npm ci

<span class="text-slate-500"># Stage 2: Build Application</span>
<span class="text-violet-400">FROM</span> base <span class="text-violet-400">AS</span> builder
<span class="text-cyan-400">WORKDIR</span> /app
<span class="text-cyan-400">COPY</span> --from=deps /app/node_modules ./node_modules
<span class="text-cyan-400">COPY</span> . .
<span class="text-cyan-400">ENV</span> NEXT_TELEMETRY_DISABLED=1
<span class="text-cyan-400">RUN</span> npm run build

<span class="text-slate-500"># Stage 3: Lightweight Production Runner</span>
<span class="text-violet-400">FROM</span> base <span class="text-violet-400">AS</span> runner
<span class="text-cyan-400">WORKDIR</span> /app
<span class="text-cyan-400">ENV</span> NODE_ENV=production
<span class="text-cyan-400">RUN</span> addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
<span class="text-cyan-400">COPY</span> --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
<span class="text-cyan-400">COPY</span> --from=builder --chown=nextjs:nodejs /app/public ./public
<span class="text-cyan-400">COPY</span> --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

<span class="text-cyan-400">USER</span> nextjs
<span class="text-cyan-400">EXPOSE</span> <span class="text-violet-400">3000</span>
<span class="text-cyan-400">CMD</span> [<span class="text-amber-300">"node"</span>, <span class="text-amber-300">"server.js"</span>]`,
    },
  },
  {
    id: "vps-hosting",
    stepNumber: "04",
    name: "Production Linux VPS Hosting",
    category: "HOSTING & RUNTIME",
    badge: "UBUNTU 22.04 LTS",
    status: "ONLINE",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    icon: Cloud,
    summary:
      "High-availability Linux VPS deployment with Nginx reverse proxying, Let's Encrypt automated SSL/TLS certificates, Gzip/Brotli compression, and UFW firewall security.",
    metrics: [
      { label: "Server CPU Load", value: "4.2%", subtext: "Dual-Core vCPU", progress: 12 },
      { label: "SSL/TLS Grade", value: "A+ Rating", subtext: "Let's Encrypt TLS 1.3", progress: 100 },
      { label: "HTTP Compression", value: "Brotli + Gzip", subtext: "70% payload reduction", progress: 92 },
      { label: "Firewall (UFW)", value: "Strict Active", subtext: "Ports 80, 443, 22 only", progress: 100 },
    ],
    specifications: [
      "Nginx High-Performance Reverse Proxy with HTTP/2 and Proxy Buffering",
      "Certbot Automated 90-Day SSL/TLS Certificate Renewals",
      "UFW (Uncomplicated Firewall) with strict port and IP rate limits",
      "Systemd Service Watchdog maintaining 99.9% application uptime",
    ],
    components: [
      { name: "Reverse Proxy", type: "Nginx 1.24 with HTTP/2", state: "Active" },
      { name: "SSL Engine", type: "Let's Encrypt Auto-Renewal", state: "Secured" },
      { name: "Host OS", type: "Ubuntu 22.04 LTS (Bash)", state: "Running" },
      { name: "Firewall", type: "UFW Rate-limited", state: "Protected" },
    ],
    codeConfig: {
      filename: "nginx.conf",
      language: "nginx",
      code: `server {
    listen 80;
    server_name abhayjangid.dev www.abhayjangid.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name abhayjangid.dev;

    ssl_certificate /etc/letsencrypt/live/abhayjangid.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abhayjangid.dev/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`,
      highlightedHtml: `<span class="text-violet-400">server</span> {
    <span class="text-cyan-400">listen</span> <span class="text-violet-400">80</span>;
    <span class="text-cyan-400">server_name</span> <span class="text-amber-300">abhayjangid.dev www.abhayjangid.dev</span>;
    <span class="text-cyan-400">return</span> <span class="text-violet-400">301</span> https://$host$request_uri;
}

<span class="text-violet-400">server</span> {
    <span class="text-cyan-400">listen</span> <span class="text-violet-400">443</span> ssl http2;
    <span class="text-cyan-400">server_name</span> <span class="text-amber-300">abhayjangid.dev</span>;

    <span class="text-cyan-400">ssl_certificate</span> <span class="text-amber-300">/etc/letsencrypt/live/abhayjangid.dev/fullchain.pem</span>;
    <span class="text-cyan-400">ssl_certificate_key</span> <span class="text-amber-300">/etc/letsencrypt/live/abhayjangid.dev/privkey.pem</span>;
    <span class="text-cyan-400">ssl_protocols</span> TLSv1.2 TLSv1.3;

    <span class="text-cyan-400">location</span> / {
        <span class="text-cyan-400">proxy_pass</span> <span class="text-amber-300">http://127.0.0.1:3000</span>;
        <span class="text-cyan-400">proxy_http_version</span> 1.1;
        <span class="text-cyan-400">proxy_set_header</span> Upgrade $http_upgrade;
        <span class="text-cyan-400">proxy_set_header</span> Connection <span class="text-amber-300">'upgrade'</span>;
        <span class="text-cyan-400">proxy_set_header</span> Host $host;
        <span class="text-cyan-400">proxy_cache_bypass</span> $http_upgrade;
    }
}`,
    },
  },
];

export default function CloudArchitecture() {
  const [selectedStageId, setSelectedStageId] = useState(PIPELINE_STAGES[0].id);
  const [isCopied, setIsCopied] = useState(false);

  const activeStage =
    PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  const handleCopyCode = () => {
    soundFx.playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activeStage.codeConfig.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section
      id="architecture"
      className="hardware-accelerated relative z-10 w-full px-6 py-24 md:py-28 md:px-12 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 font-semibold shadow-glow-cyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>DevOps Pipeline · Deployment Architecture</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F8FAFC]">
            DevOps & Full-Stack <br />
            <span className="text-nebula-gradient">Deployment Pipeline</span>
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-slate-400 max-w-md leading-relaxed">
          From local TypeScript development and automated GitHub Actions CI/CD to multi-stage Docker containerization and production Linux VPS deployment.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 4-Stage Pipeline Selector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="font-mono text-xs text-slate-400 uppercase tracking-widest px-1 font-semibold flex items-center justify-between">
            <span>PIPELINE STAGES</span>
            <span className="text-cyan-400">4 OF 4 CONFIGURED</span>
          </div>

          {PIPELINE_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            const Icon = stage.icon;

            return (
              <motion.button
                key={stage.id}
                type="button"
                data-cursor="Inspect"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedStageId(stage.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`hardware-accelerated w-full text-left p-6 rounded-2xl transition-all duration-300 relative overflow-hidden cursor-pointer border ${
                  isSelected
                    ? "bg-[#0A0E1A] border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50"
                    : "bg-[#0A0E1A]/60 border-slate-800 hover:border-slate-700 hover:bg-[#0A0E1A]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-cyan-400 font-bold">{stage.stepNumber}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      {stage.category}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full border font-semibold ${stage.statusColor}`}
                  >
                    {stage.status}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-[#F8FAFC] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{stage.name}</span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" : "bg-slate-700"
                    }`}
                  />
                </h3>

                <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {stage.summary}
                </p>

                {/* Sub-components badges */}
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {stage.components.slice(0, 3).map((comp) => (
                    <span
                      key={comp.name}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {comp.name}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Live Telemetry & Code Inspector (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-6 sm:p-8 cosmic-glass shadow-2xl relative overflow-hidden text-[#F8FAFC]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>TELEMETRY INSPECTOR // STAGE {activeStage.stepNumber}</span>
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-[#F8FAFC]">
                    {activeStage.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold shadow-glow-cyan">
                    {activeStage.badge}
                  </span>
                </div>
              </div>

              {/* Performance & Operational Metrics */}
              <div className="my-6">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                  Stage Metrics & Validation Telemetry
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeStage.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-xl bg-[#131B2E]/70 border border-slate-800/80"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs text-slate-400 font-medium">
                          {metric.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#F8FAFC]">
                          {metric.value}
                        </span>
                      </div>

                      {/* Progress Bar with Cyan -> Violet Gradient & Leading Glow */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.progress}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full relative shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        />
                      </div>

                      <span className="font-mono text-[10px] text-slate-400">
                        {metric.subtext}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Components Matrix */}
              <div className="my-6">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                  Active Stack Entities & Component Topology
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStage.components.map((comp) => (
                    <div
                      key={comp.name}
                      className="p-3 rounded-lg bg-[#131B2E]/50 border border-slate-800/80 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#F8FAFC] font-semibold">
                          {comp.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {comp.type}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {comp.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="my-6">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                  Engineering Guardrails & Standards
                </div>

                <div className="space-y-2 font-mono text-xs text-slate-300">
                  {activeStage.specifications.map((spec) => (
                    <div key={spec} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syntax Highlighted Code Manifest Snippet with Top Display Line */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Configuration Manifest:</span>
                    <span className="text-[#F8FAFC] font-bold">
                      {activeStage.codeConfig.filename}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    onMouseEnter={() => soundFx.playHover()}
                    className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-md bg-slate-800/90 hover:bg-cyan-600 text-slate-200 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    {isCopied ? (
                      <>
                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Manifest</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-[#03040B] border border-cyan-500/30 p-4 font-mono text-xs text-slate-200 overflow-x-auto terminal-display-line shadow-inner">
                  <pre className="leading-relaxed">
                    <code dangerouslySetInnerHTML={{ __html: activeStage.codeConfig.highlightedHtml }} />
                  </pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
