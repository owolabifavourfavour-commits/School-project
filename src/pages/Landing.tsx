import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle2, ChevronRight, CircleDollarSign, Menu, ShieldCheck, UsersRound } from "lucide-react";

const features = [
  {
    icon: CircleDollarSign,
    title: "See your cash position",
    description: "Know what your school should collect, what has come in, and exactly what is still outstanding.",
    color: "bg-[#E8F7F1] text-teal",
  },
  {
    icon: UsersRound,
    title: "Stay on top of debtors",
    description: "Find students with outstanding balances quickly by searching their name, admission number, or class.",
    color: "bg-[#FFF0EC] text-coral",
  },
  {
    icon: BarChart3,
    title: "Make better decisions",
    description: "Compare collection performance across classes and focus your attention where it matters most.",
    color: "bg-[#FFF4D8] text-[#C78600]",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-sand">
      <header className="relative z-10 border-b border-slate-100/80 bg-sand/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white">I</span>
            <span>I-tree <span className="font-normal text-slate-400">School</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <a href="#how-it-works" className="transition hover:text-teal">How it works</a>
            <a href="#features" className="transition hover:text-teal">Features</a>
            <Link to="/signin" className="text-teal transition hover:text-[#117764]">Sign in</Link>
            <Link to="/signup" className="rounded-xl bg-ink px-4 py-2.5 text-white transition hover:bg-[#243f55]">Get started</Link>
          </nav>
          <Link to="/signin" className="rounded-lg p-2 text-ink md:hidden" aria-label="Open sign in">
            <Menu size={21} />
          </Link>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="pointer-events-none absolute -right-36 -top-20 h-96 w-96 rounded-full bg-mint/80 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-teal">
                <ShieldCheck size={14} /> Built for school proprietors
              </div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl">
                A clearer school day starts with <span className="text-teal">I-tree.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                I-tree is the dedicated fee and payment space for our students, families, and school team. Keep class fees, payments, and balances together so our school can focus on helping every learner thrive.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal/20 transition hover:bg-[#117764]">
                  Start for free <ArrowRight size={17} />
                </Link>
                <Link to="/signin" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:border-teal hover:text-teal">
                  Try the demo
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-teal" /> Simple to use</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-teal" /> Built for mobile</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-teal" /> No spreadsheets</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-7 top-12 h-24 w-24 rounded-3xl bg-[#FFF0EC]" />
              <div className="absolute -bottom-6 -right-5 h-32 w-32 rounded-full bg-[#FFF4D8]" />
              <div className="relative rounded-3xl border border-white bg-white p-3 shadow-[0_24px_70px_rgba(23,42,58,0.14)]">
                <div className="rounded-2xl bg-[#F7FAF9] p-5">
                  <div className="flex items-center justify-between">
                    <div><p className="text-[11px] font-semibold text-slate-400">I-TREE SCHOOL OVERVIEW</p><p className="mt-1 text-sm font-bold text-ink">I-tree Primary &amp; Secondary</p></div>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal text-sm font-bold text-white">I</span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-ink p-4 text-white"><p className="text-[11px] text-slate-300">Collected</p><p className="mt-2 text-xl font-bold">₦5.8m</p><p className="mt-1 text-[10px] text-[#70D6BF]">↑ 68% rate</p></div>
                    <div className="rounded-xl bg-white p-4 shadow-sm"><p className="text-[11px] text-slate-400">Outstanding</p><p className="mt-2 text-xl font-bold text-coral">₦2.7m</p><p className="mt-1 text-[10px] text-slate-400">24 students</p></div>
                  </div>
                  <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between"><p className="text-xs font-bold text-ink">Class performance</p><p className="text-[10px] text-slate-400">This term</p></div>
                    {["Primary 4", "Primary 5", "JSS1"].map((item, index) => <div key={item} className="mt-4"><div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-500"><span>{item}</span><span className="text-teal">{[82, 71, 64][index]}%</span></div><div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal" style={{ width: `${[82, 71, 64][index]}%` }} /></div></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl"><p className="text-sm font-bold text-teal">OUR SCHOOL, ONE CLEAR VIEW</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">The simple way to stay connected to I-tree.</h2><p className="mt-4 leading-7 text-slate-500">Students, families, and the school team can keep up with fees and payment progress in one calm, focused workspace.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, description, color }) => <div key={title} className="rounded-2xl border border-slate-100 bg-sand/40 p-6 transition hover:-translate-y-1 hover:shadow-soft"><span className={`inline-flex rounded-xl p-3 ${color}`}><Icon size={21} /></span><h3 className="mt-5 font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>)}</div>
          </div>
        </section>

        <section id="how-it-works" className="bg-ink py-20 text-white sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div><p className="text-sm font-bold text-[#70D6BF]">HOW IT WORKS</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From fees to focus in three steps.</h2><p className="mt-4 max-w-md leading-7 text-slate-300">Spend less time looking for answers and more time making confident decisions for your school.</p><Link to="/signup" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#70D6BF] hover:text-white">Create your workspace <ChevronRight size={17} /></Link></div>
              <div className="grid gap-4 sm:grid-cols-3">{[["01", "Set up", "Create your account and add your school’s classes and fee items."], ["02", "See the picture", "View expected, collected, and outstanding fees at a glance."], ["03", "Take action", "Open a student ledger, follow up, and record payments as they arrive."]].map(([number, title, description]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/5 p-5"><span className="text-sm font-bold text-[#70D6BF]">{number}</span><h3 className="mt-8 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{description}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="bg-sand px-4 py-20 text-center sm:py-24"><div className="mx-auto max-w-2xl"><h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Your school deserves financial clarity.</h2><p className="mt-4 leading-7 text-slate-500">Start with a simple view of your collections and build from there.</p><Link to="/signup" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal/20 transition hover:bg-[#117764]">Get started with I-tree <ArrowRight size={17} /></Link></div></section>
      </main>
      <footer className="border-t border-slate-100 bg-sand"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span className="font-bold text-ink">I-tree School</span><span>Growing learners together, with clarity for every family.</span></div></footer>
    </div>
  );
}
