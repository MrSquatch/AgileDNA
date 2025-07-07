export function SectionContainer({children}: {children: React.ReactNode}) {
    return(
        <section className="flex-1 max-h-dvh p-4 border-l border-l-zinc-600">
            {children}
        </section>
    )
}