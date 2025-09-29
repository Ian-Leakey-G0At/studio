"use client";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function AccountPage() {
  const { userProfile } = useAuth();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[var(--light-gray)] text-[var(--deep-indigo)]">
      <div className="flex-grow pb-24">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-[var(--light-gray)]/80 p-4 backdrop-blur-sm">
          <button
            aria-label="Go back"
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span className="material-symbols-outlined text-3xl">
              arrow_back_ios_new
            </span>
          </button>
          <h1 className="font-headline text-2xl font-bold">Account</h1>
          <button
            aria-label="Settings"
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span className="material-symbols-outlined text-3xl">
              settings
            </span>
          </button>
        </header>
        <main className="p-4">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <img
                alt="User profile picture"
                className="h-24 w-24 rounded-full border-4 border-white shadow-md"
                src={userProfile?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBG4Km6DtdxHoSoFzBjwC91flrkYS3mU8G5EgphjHW26T9tR4XBDlaLICHB2LVhwXnL8iqFHzfqfU9ATPbZhfPiL-qeuk28wAk16UqhLgsbI_jeh-KicKfd9jJ8KzflAOC5us0DAIW2TvY3VRSlGhbKxYyFPfzVFNYD0cB22bHxue8OUlRdGIWpivxoel_5lYpYp9SkzI0142uMTtwQ7h8xqbW4pH7qojTigQXU2pYVNr3r3ueiwwA9BzGn8IZKB3TW7-FkEkTMiNs"}
              />
              <button
                aria-label="Edit profile picture"
                className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--muted-green)] text-white"
              >
                <span className="material-symbols-outlined text-xl">edit</span>
              </button>
            </div>
            <h2 className="font-headline text-2xl font-bold">{userProfile?.displayName || "Alex Morgan"}</h2>
            <p className="text-[var(--muted-green)]">{userProfile?.email || "alex.morgan@email.com"}</p>
          </div>
          <div className="space-y-8">
            <section>
              <h3 className="font-headline text-xl font-bold text-[var(--deep-indigo)] mb-4">
                Course History
              </h3>
              <div className="space-y-4">
                <div className="glassmorphism flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/60">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--deep-indigo)] text-white">
                      <span className="material-symbols-outlined text-3xl">
                        bar_chart
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--deep-indigo)]">
                        Intro to Stock Market
                      </p>
                      <p className="text-sm text-gray-500">
                        Completed: 15/03/2024
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-[var(--muted-green)]">
                    check_circle
                  </span>
                </div>
                <div className="glassmorphism flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/60">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--deep-indigo)] text-white">
                      <span className="material-symbols-outlined text-3xl">
                        real_estate_agent
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--deep-indigo)]">
                        Real Estate 101
                      </p>
                      <p className="text-sm text-gray-500">
                        In Progress - 75%
                      </p>
                    </div>
                  </div>
                  <div className="h-2.5 w-16 rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-[var(--muted-green)]"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/80 px-4 pb-3 pt-2 backdrop-blur-sm">
        <div className="flex justify-around">
          <Link
            className="flex h-12 w-16 flex-col items-center justify-center gap-1 py-2 text-gray-500"
            href="#"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link
            className="flex h-12 w-16 flex-col items-center justify-center gap-1 py-2 text-gray-500"
            href="#"
          >
            <span className="material-symbols-outlined">school</span>
            <span className="text-xs font-medium">Courses</span>
          </Link>
          <Link
            className="flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-[var(--deep-indigo)]/10 py-2 text-[var(--deep-indigo)]"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs font-bold">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
