// src/components/Layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-6 pb-32 pt-12 md:px-12 lg:max-w-6xl lg:py-0 xl:max-w-7xl">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {children}
      </div>
    </div>
  )
}
