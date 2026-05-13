import React, { useMemo, useState } from "react";

const iconMap = {
  home: "⌂",
  book: "▤",
  history: "↺",
  radio: "◉",
  gift: "🎁",
  user: "♙",
  settings: "⚙",
  mic: "🎙",
  mail: "✉",
  users: "♟",
  file: "▣",
  chat: "☏",
  clock: "◴",
  gauge: "◔",
  timer: "⏱",
  chart: "▥",
  lock: "🔒",
  shield: "▰",
  database: "◫",
  keyboard: "⌨",
  play: "▶",
  pause: "Ⅱ",
  close: "×",
  check: "✓",
  copy: "⧉",
  search: "⌕",
  download: "⇩",
  star: "☆",
  more: "•••",
  arrow: "›",
  spark: "✦",
};

function Icon({ name, size = 18, className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.9 }}
    >
      {iconMap[name] || "•"}
    </span>
  );
}

const navItems = [
  { icon: "home", label: "首页" },
  { icon: "book", label: "词汇" },
  { icon: "history", label: "历史记录" },
  { icon: "radio", label: "录音室", beta: true },
];

const scenarios = [
  { icon: "mail", label: "邮件回复", desc: "把语音快速整理成礼貌、清晰的邮件草稿。" },
  { icon: "users", label: "会议记录", desc: "自动提取议题、结论和待办，适合周会复盘。" },
  { icon: "file", label: "文档写作", desc: "将口述内容整理为结构化文档，降低写作启动成本。" },
  { icon: "chat", label: "聊天沟通", desc: "边说边转文字，适合即时沟通和灵感记录。" },
];

const baseStats = [
  { label: "累计听写时长", value: "32", unit: "h 48 min", sub: "较上周", rise: "+18% ↗", icon: "clock", art: "wave", className: "from-sky-50 to-blue-100/70" },
  { label: "平均听写速度", value: "186", unit: "字/分钟", sub: "较上周", rise: "+6% ↗", icon: "gauge", art: "ring", className: "from-emerald-50 to-cyan-100/60" },
  { label: "听写字数", value: "128,562", unit: "字", sub: "较上周", rise: "+21% ↗", icon: "file", art: "type", className: "from-violet-50 to-purple-100/60" },
  { label: "节省时间", value: "18", unit: "h 36 min", sub: "较上周", rise: "+24% ↗", icon: "timer", art: "hourglass", className: "from-orange-50 to-amber-100/70" },
];

const records = [
  { title: "产品周会记录", desc: "本次会议主要讨论了产品路线图、用户反馈与下阶段需求优先级。", words: "1,842 字", date: "05/16 10:30", time: "10:30" },
  { title: "邮件回复草稿", desc: "感谢你的反馈，我们会尽快处理你的问题，并在确认后同步解决方案。", words: "532 字", date: "05/15", time: "05/15" },
  { title: "项目需求整理", desc: "一、背景与目标  二、核心需求  三、里程碑计划  详见附件。", words: "2,316 字", date: "05/15", time: "05/15" },
];

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-7 right-7 z-50 flex w-[330px] items-start gap-3 rounded-2xl border border-indigo-100 bg-white/95 p-4 shadow-[0_24px_70px_rgba(79,70,229,0.22)] backdrop-blur-xl">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon name="check" size={21} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-black text-slate-900">操作成功</div>
        <p className="mt-1 text-xs leading-5 text-slate-500">{message}</p>
      </div>
      <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

function Modal({ selectedScenario, onClose, onUse }) {
  if (!selectedScenario) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/20 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[430px] rounded-[24px] border border-white/70 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.22)]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon name={selectedScenario.icon} size={21} />
            </div>
            <div>
              <div className="font-black text-slate-950">{selectedScenario.label}</div>
              <div className="text-xs font-medium text-slate-400">Typeoff 智能场景模板</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
            <Icon name="close" size={18} />
          </button>
        </div>
        <p className="mb-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">{selectedScenario.desc}</p>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-emerald-500" /> 自动识别重点内容</div>
          <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-emerald-500" /> 生成更清晰的文字结构</div>
          <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-emerald-500" /> 支持一键复制和继续编辑</div>
        </div>
        <button onClick={onUse} className="mt-6 h-11 w-full rounded-xl bg-indigo-600 text-sm font-black text-white shadow-[0_14px_30px_rgba(79,70,229,0.24)] hover:bg-indigo-700">使用这个场景开始听写</button>
      </div>
    </div>
  );
}

function Sidebar({ activeNav, setActiveNav, showToast }) {
  return (
    <aside className="flex h-full w-[236px] shrink-0 flex-col border-r border-slate-200/70 bg-white/90 px-5 py-7">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
          <div className="flex h-6 items-end gap-[3px]">{[16, 24, 12, 28, 19].map((h, i) => <span key={i} className="w-[3px] rounded-full bg-white" style={{ height: h }} />)}</div>
        </div>
        <div className="text-[22px] font-extrabold tracking-tight text-slate-950">Typeoff</div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ icon, label, beta }) => {
          const active = activeNav === label;
          return (
            <button key={label} onClick={() => setActiveNav(label)} className={`flex h-11 w-full items-center gap-3 rounded-xl px-4 text-[15px] font-semibold transition ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}>
              <Icon name={icon} size={19} />
              <span>{label}</span>
              {beta && <span className="ml-auto rounded-md bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-500">Beta</span>}
            </button>
          );
        })}
      </nav>

      <div className="-mx-2 mt-auto rounded-2xl bg-gradient-to-b from-white to-slate-50 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <button onClick={() => showToast("邀请链接已复制，可发送给朋友领取 Pro 奖励。")} className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-orange-50">
          <Icon name="gift" size={17} className="text-orange-500" />
          <span>邀请好友</span>
          <span className="ml-auto rounded-full bg-orange-500 px-2 text-xs font-bold text-white">$8</span>
        </button>
        <button onClick={() => showToast("已打开个人账户面板。当前为 Free 版本。")} className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Icon name="user" size={17} />
          <span>tianyi shen</span>
          <span className="ml-auto rounded-full bg-slate-200 px-2 text-[11px] font-bold text-slate-500">Free</span>
        </button>
        <button onClick={() => showToast("设置入口已触发：可在真实产品里展开语言、快捷键、隐私选项。")} className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Icon name="settings" size={17} />
          <span>设置</span>
        </button>
      </div>
    </aside>
  );
}

function Hero({ isRecording, setIsRecording, onScenarioClick, showToast }) {
  return (
    <section className="relative h-[310px] shrink-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 px-8 py-9 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]">
      <div className="absolute right-0 top-0 h-full w-[48%] overflow-hidden">
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-2xl" />
        <div className="absolute right-4 bottom-5 h-44 w-80 rotate-[-10deg] rounded-[50%] bg-gradient-to-br from-blue-200/80 to-purple-200/60 blur-sm" />
        <div className="absolute right-28 top-11 w-[300px] rotate-[-2deg] rounded-[24px] bg-white/75 p-6 shadow-[0_26px_70px_rgba(99,102,241,0.20)] backdrop-blur-xl">
          <div className="absolute -right-7 -top-3 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-lg">
            {isRecording ? "实时转写中" : "等待开始"} <span className="ml-2">•••</span>
          </div>
          <div className="mb-5 flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full shadow-inner ${isRecording ? "bg-indigo-100 text-indigo-600 animate-pulse" : "bg-slate-100 text-slate-400"}`}>
              <Icon name={isRecording ? "mic" : "pause"} size={22} />
            </div>
            <div className="flex flex-1 items-center gap-1">
              {Array.from({ length: 26 }).map((_, i) => (
                <span key={i} className={`w-[3px] rounded-full ${isRecording ? "bg-indigo-300" : "bg-slate-200"}`} style={{ height: isRecording ? 8 + Math.abs(Math.sin(i * 1.7)) * 24 : 8 + Math.abs(Math.sin(i)) * 8 }} />
              ))}
            </div>
          </div>
          <div className="space-y-3">{[92, 84, 78, 88, 64].map((w, i) => <div key={i} className="h-3 rounded-full bg-indigo-100/80" style={{ width: `${w}%` }} />)}</div>
        </div>
      </div>

      <div className="relative z-10 max-w-[980px]">
        <h1 className="mb-4 text-[36px] font-black leading-tight tracking-[-0.04em] text-slate-950">轻松说话， <span className="text-indigo-500">精准书写</span>， 随时随地</h1>
        <p className="mb-5 max-w-[520px] text-[15px] leading-7 text-slate-600">Typeoff 用 AI 将你的语音实时转为文字，准确高效，隐私安全，<br />让表达更自由，让创作无负担。</p>
        <div className="mb-5 flex items-center gap-4">
          <button onClick={() => setIsRecording(!isRecording)} className={`flex h-11 items-center gap-2 rounded-xl px-6 text-[15px] font-bold text-white shadow-[0_12px_24px_rgba(79,70,229,0.24)] transition ${isRecording ? "bg-rose-500 hover:bg-rose-600" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            <Icon name={isRecording ? "pause" : "mic"} size={18} /> {isRecording ? "暂停听写" : "立即开始听写"}
          </button>
          <button onClick={() => showToast("已为你展开常用场景，可点击下方场景标签查看模板。") } className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-[15px] font-bold text-slate-700 shadow-sm hover:bg-slate-50">
            使用场景 <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="relative z-20 flex h-10 w-[980px] items-center gap-3 whitespace-nowrap">
          {scenarios.map((item) => (
            <button key={item.label} onClick={() => onScenarioClick(item)} className="flex h-9 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 text-sm font-semibold text-slate-700 shadow-[0_5px_14px_rgba(15,23,42,0.08)] backdrop-blur hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
              <Icon name={item.icon} size={16} className="text-indigo-500" /> {item.label}
            </button>
          ))}

          <button onClick={() => showToast("已选择 Notion 集成，可将听写内容同步为页面。") } className="flex h-9 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 text-sm font-bold text-slate-700 shadow-[0_5px_14px_rgba(15,23,42,0.08)] backdrop-blur hover:border-indigo-200 hover:bg-indigo-50">
            <span className="rounded bg-slate-900 px-1.5 py-0.5 text-xs leading-none text-white">N</span> Notion
          </button>
          <button onClick={() => showToast("已选择 Slack 集成，可把纪要同步到频道。") } className="flex h-9 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 text-sm font-bold text-emerald-500 shadow-[0_5px_14px_rgba(15,23,42,0.08)] backdrop-blur hover:border-emerald-200 hover:bg-emerald-50">
            <span className="text-base leading-none">✣</span> Slack
          </button>
          <button onClick={() => showToast("已选择 Gmail 集成，可生成邮件草稿。") } className="flex h-9 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 text-sm font-bold text-red-500 shadow-[0_5px_14px_rgba(15,23,42,0.08)] backdrop-blur hover:border-red-200 hover:bg-red-50">
            <span className="text-sm font-black">M</span> Gmail
          </button>
          <button onClick={() => showToast("更多集成暂未展开：可继续接入飞书、微信、钉钉等渠道。") } className="flex h-9 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 text-sm font-bold text-slate-600 shadow-[0_5px_14px_rgba(15,23,42,0.08)] backdrop-blur hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
            <span className="text-lg leading-none">⋮⋮</span> 更多
          </button>
        </div>
      </div>
    </section>
  );
}

function StatArt({ type }) {
  if (type === "wave") {
    return (
      <div className="absolute right-6 top-10 flex items-end gap-1 opacity-60">
        {[12, 22, 32, 18].map((h, i) => <span key={i} className="w-3 rounded-full bg-indigo-300/70" style={{ height: h }} />)}
      </div>
    );
  }
  if (type === "ring") return <div className="absolute right-6 top-9 h-11 w-11 rounded-full border-[6px] border-emerald-300 border-l-transparent opacity-85" />;
  if (type === "type") return <div className="absolute right-6 top-10 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-200/70 text-2xl font-black text-violet-500">T</div>;
  return <div className="absolute right-6 top-9 text-4xl opacity-45">⏳</div>;
}

function StatsGrid({ isRecording }) {
  const stats = useMemo(() => baseStats.map((item, index) => index === 2 && isRecording ? { ...item, value: "128,719", rise: "+22% ↗" } : item), [isRecording]);
  return <div className="grid grid-cols-4 gap-4">{stats.map(({ label, value, unit, sub, rise, icon, art, className }) => <button key={label} className={`relative h-[108px] overflow-hidden rounded-2xl bg-gradient-to-br ${className} p-4 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)] transition hover:-translate-y-0.5 hover:shadow-lg`}><div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500"><Icon name={icon} size={15} className="text-indigo-500" /> {label}</div><div className="flex items-baseline gap-2"><span className="text-[22px] font-black tracking-tight text-slate-950">{value}</span><span className="text-[13px] font-black text-slate-950">{unit}</span></div><div className="mt-1 text-[11px] font-medium text-slate-500">{sub} <span className="ml-2 font-bold text-emerald-600">{rise}</span></div><StatArt type={art} /></button>)}</div>;
}

function ProductivityChart({ range, setRange }) {
  const weekData = [
    { date: "5/10", time: "52 min", value: 48 },
    { date: "5/11", time: "1 h 22 min", value: 62 },
    { date: "5/12", time: "1 h 06 min", value: 54 },
    { date: "5/13", time: "1 h 28 min", value: 70 },
    { date: "5/14", time: "1 h 43 min", value: 82 },
    { date: "5/15", time: "1 h 36 min", value: 76 },
    { date: "今天", time: "1 h 57 min", value: 90 },
  ];

  const monthData = [
    { date: "第1周", time: "6 h 40 min", value: 62 },
    { date: "第2周", time: "7 h 25 min", value: 72 },
    { date: "第3周", time: "8 h 10 min", value: 82 },
    { date: "本周", time: "8 h 43 min", value: 90 },
  ];

  const data = range === "近 7 天" ? weekData : monthData;

  return (
    <section className="h-[254px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[13px] font-black text-slate-800">
            <Icon name="chart" size={14} />生产力趋势
            <span className="text-[11px] font-bold text-slate-400">（{range}）</span>
          </div>
          <div className="mt-3 flex items-baseline gap-3 whitespace-nowrap">
            <span className="text-[12px] font-semibold text-slate-500">总听写时长</span>
            <span className="text-[18px] font-black tracking-tight text-slate-950">8 h 43 min</span>
            <span className="text-[12px] font-semibold text-slate-500">日均 1 h 15 min</span>
          </div>
        </div>
        <button
          onClick={() => setRange(range === "近 7 天" ? "近 30 天" : "近 7 天")}
          className="flex h-8 min-w-[78px] shrink-0 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold leading-none text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <span>{range}</span>
          <span className="text-[10px] text-slate-400">⌄</span>
        </button>
      </div>

      <div className="relative mt-1 h-[166px] pl-8 pr-2">
        <div className="absolute left-0 top-2 flex h-[122px] flex-col justify-between text-[10px] text-slate-400">
          <span>1.5h</span>
          <span>1h</span>
          <span>0.5h</span>
          <span>0</span>
        </div>

        <div className="absolute left-8 right-2 top-[78px] border-t border-dashed border-slate-300" />
        <div className="absolute right-2 top-[70px] rounded-full bg-white/90 px-1.5 text-[10px] text-slate-400">平均线</div>

        <div className="flex h-[138px] items-end justify-between border-b border-slate-200 pl-2">
          {data.map((item, i) => (
            <div key={item.date} className="group relative flex h-full w-8 flex-col items-center justify-end gap-2">
              <div className="pointer-events-none absolute -top-2 z-20 min-w-[82px] rounded-xl bg-white px-3 py-2 text-center opacity-0 shadow-[0_14px_34px_rgba(88,80,180,0.18)] ring-1 ring-indigo-100 transition group-hover:-translate-y-1 group-hover:opacity-100">
                <div className="text-[10px] font-bold text-slate-500">{item.date}</div>
                <div className="mt-0.5 text-[12px] font-black text-indigo-600">{item.time}</div>
                <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-white ring-b ring-r ring-indigo-100" />
              </div>

              <button
                title={`${item.date}：${item.time}`}
                className={`w-4 rounded-t-full rounded-b-md transition-all duration-300 group-hover:w-5 group-hover:shadow-[0_10px_22px_rgba(79,70,229,0.24)] ${i === data.length - 1 ? "bg-indigo-500" : "bg-indigo-200"}`}
                style={{ height: `${item.value}%` }}
              />
              <span className="h-3 text-[10px] leading-3 text-slate-500">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentRecords({ selectedRecord, setSelectedRecord, showToast }) {
  return (
    <section className="h-[254px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] font-extrabold text-slate-800">
          <Icon name="file" size={15} />最近听写
        </div>
        <button onClick={() => showToast("已进入全部听写记录列表。") } className="text-xs font-bold text-indigo-500 hover:text-indigo-700">查看全部 〉</button>
      </div>

      <div className="space-y-2">
        {records.map((item, index) => (
          <button key={item.title} onClick={() => setSelectedRecord(index)} className={`grid h-[56px] w-full grid-cols-[14px_1fr_60px] items-center gap-2 rounded-2xl px-3 text-left transition ${selectedRecord === index ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
            <span className={`h-2 w-2 rounded-full ${selectedRecord === index ? "bg-indigo-500" : "bg-slate-500"}`} />
            <div className="min-w-0">
              <div className="mb-0.5 flex items-center gap-2 text-[12.5px] font-black text-slate-800">
                <span className="truncate">{item.title}</span>
                <span className="font-medium text-slate-500">·</span>
                <span className="shrink-0 font-medium text-slate-500">{item.date.replace(" 10:30", "")}</span>
              </div>
              <p className="truncate text-[11px] leading-4 text-slate-500">{item.desc}</p>
            </div>
            <div className="text-right text-[10.5px] leading-4 text-slate-500">
              <div>{item.words}</div>
              <div>{item.time}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function RightCards({ showToast }) {
  return (
    <div className="grid h-[254px] grid-rows-2 gap-4">
      <section className="relative min-h-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85)]">
        <Icon name="spark" className="absolute right-20 top-3 text-violet-300" size={14} />
        <div className="relative z-10 max-w-[158px]">
          <h3 className="mb-1 text-[12.5px] font-black text-slate-800">邀请好友</h3>
          <p className="mb-2 text-[10.5px] leading-4 text-slate-500">双方各得 7 天 Pro。</p>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast("邀请链接已复制：好友注册后你们都能获得奖励。") } className="h-7 rounded-lg bg-indigo-600 px-3 text-[10.5px] font-bold text-white shadow-lg hover:bg-indigo-700">立即邀请</button>
            <button onClick={() => showToast("邀请码 TYP2024 已复制。") } className="text-[10px] font-semibold text-slate-500 hover:text-indigo-600">TYP2024</button>
          </div>
        </div>
        <div className="absolute bottom-2 right-3 text-[42px] leading-none">🎁</div>
      </section>

      <section className="relative min-h-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85)]">
        <h3 className="mb-2 text-[12.5px] font-black text-slate-800">隐私安全</h3>
        <div className="relative z-10 space-y-1.5 text-[10.5px] font-medium text-slate-600">
          <div className="flex items-center gap-1.5"><Icon name="database" size={12} />本地存储</div>
          <div className="flex items-center gap-1.5"><Icon name="lock" size={12} />内容不上传</div>
          <div className="flex items-center gap-1.5"><Icon name="shield" size={12} />用户可控</div>
        </div>
        <div className="absolute right-4 top-10 flex h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-emerald-300/35 text-emerald-600">
          <Icon name="lock" size={25} />
        </div>
      </section>
    </div>
  );
}

function ShortcutBar({ showToast }) {
  return (
    <div className="flex h-10 w-[500px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-500 shadow-sm">
      <Icon name="keyboard" size={15} />
      <span>按下</span>
      <kbd className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-bold text-slate-700">Alt</kbd>
      <span>键开始/停止语音输入，或长按空格侧边听写</span>
      <button onClick={() => showToast("快捷键设置面板已触发。") } className="ml-auto font-bold text-indigo-500 hover:text-indigo-700">自定义快捷键 〉</button>
    </div>
  );
}

function TopWindowBar() {
  return <div className="absolute right-5 top-3 flex items-center gap-5 text-slate-500"><Icon name="search" size={15} /><Icon name="download" size={15} /><Icon name="star" size={15} /></div>;
}

export default function TypeoffHomeUI() {
  const [activeNav, setActiveNav] = useState("首页");
  const [isRecording, setIsRecording] = useState(false);
  const [range, setRange] = useState("近 7 天");
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  return (
    <main className="min-h-screen overflow-auto bg-[#fafafa] p-4 font-sans text-slate-900">
      <div className="relative mx-auto flex h-[860px] w-[1440px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
        <TopWindowBar />
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} showToast={showToast} />
        <section className="flex-1 bg-white p-5 pt-9">
          <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white p-5">
            <Hero isRecording={isRecording} setIsRecording={setIsRecording} onScenarioClick={setSelectedScenario} showToast={showToast} />
            <div className="mt-4 shrink-0"><StatsGrid isRecording={isRecording} /></div>
            <div className="mt-4 shrink-0 grid grid-cols-[0.95fr_1.44fr_0.72fr] gap-4 items-start">
              <ProductivityChart range={range} setRange={setRange} />
              <RecentRecords selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} showToast={showToast} />
              <RightCards showToast={showToast} />
            </div>
            <div className="mt-4 shrink-0"><ShortcutBar showToast={showToast} /></div>
          </div>
        </section>
      </div>
      <Modal selectedScenario={selectedScenario} onClose={() => setSelectedScenario(null)} onUse={() => { setSelectedScenario(null); setIsRecording(true); showToast("已套用场景模板，并开始实时听写。"); }} />
      <Toast message={toast} onClose={() => setToast("")} />
    </main>
  );
}
