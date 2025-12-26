import { useMemo, useState } from 'react'
import { recipes } from './data'

const uniqueValues = (key) =>
  Array.from(new Set(recipes.map((row) => row[key]).filter(Boolean))).sort()

const formatIngredients = (ingredients) =>
  Array.isArray(ingredients) ? ingredients.join(' / ') : ingredients || ''

function App() {
  const [search, setSearch] = useState('')
  const [base, setBase] = useState('')
  const [method, setMethod] = useState('')
  const [glass, setGlass] = useState('')
  const [ice, setIce] = useState('')

  const bases = useMemo(() => uniqueValues('base'), [])
  const methods = useMemo(() => uniqueValues('method'), [])
  const glasses = useMemo(() => uniqueValues('glass'), [])
  const ices = useMemo(() => uniqueValues('ice'), [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return recipes.filter((row) => {
      if (base && row.base !== base) return false
      if (method && row.method !== method) return false
      if (glass && row.glass !== glass) return false
      if (ice && row.ice !== ice) return false
      if (!q) return true
      const ingredients = formatIngredients(row.ingredients)
      const hay = `${row.name} ${ingredients} ${row.note || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [search, base, method, glass, ice])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff9f1_0%,#f8f3ea_45%,#efe4d5_100%)] text-[#1a1715]">
      <div className="pointer-events-none fixed left-[-8vmin] top-[-10vmin] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,#f9d4a8_0%,transparent_70%)] opacity-40 blur-[0.5vmin] -z-10" />
      <div className="pointer-events-none fixed bottom-[-15vmin] right-[-10vmin] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,#7dc1b1_0%,transparent_70%)] opacity-40 blur-[0.5vmin] -z-10" />

      <header className="flex flex-col gap-3 px-[7vw] pb-6 pt-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a5482f]">
            Beginner Bartender Toolkit
          </p>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold">Cocktail Trainer</h1>
        </div>
      </header>

      <main className="grid gap-6 px-[7vw] pb-16 max-md:px-[6vw]">
        <section className="rounded-[24px] bg-white/80 p-6 shadow-[0_18px_40px_rgba(26,23,21,0.18)]">
          <h2 className="mb-4 text-xl font-semibold">Filters</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            <label className="flex flex-col gap-1.5 text-sm text-[#42352f]">
              <span>検索</span>
              <input
                type="search"
                placeholder="カクテル名・材料・備考"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="rounded-xl border border-[#d2c4b6] bg-white px-3 py-2 text-[0.95rem]"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-[#42352f]">
              <span>ベース</span>
              <select
                value={base}
                onChange={(event) => setBase(event.target.value)}
                className="rounded-xl border border-[#d2c4b6] bg-white px-3 py-2 text-[0.95rem]"
              >
                <option value="">すべてのベース</option>
                {bases.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-[#42352f]">
              <span>技法</span>
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value)}
                className="rounded-xl border border-[#d2c4b6] bg-white px-3 py-2 text-[0.95rem]"
              >
                <option value="">すべての技法</option>
                {methods.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-[#42352f]">
              <span>グラス</span>
              <select
                value={glass}
                onChange={(event) => setGlass(event.target.value)}
                className="rounded-xl border border-[#d2c4b6] bg-white px-3 py-2 text-[0.95rem]"
              >
                <option value="">すべてのグラス</option>
                {glasses.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-[#42352f]">
              <span>氷</span>
              <select
                value={ice}
                onChange={(event) => setIce(event.target.value)}
                className="rounded-xl border border-[#d2c4b6] bg-white px-3 py-2 text-[0.95rem]"
              >
                <option value="">すべての氷</option>
                {ices.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-[24px] bg-white/80 p-6 shadow-[0_18px_40px_rgba(26,23,21,0.18)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Recipes</h2>
            <span className="text-sm text-[#7a6a61]">{filtered.length} 件表示</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse max-sm:min-w-0 max-sm:block">
              <thead className="max-sm:hidden">
                <tr>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    カクテル名
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    ベース
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    技法
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    グラス
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    氷
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    材料
                  </th>
                  <th className="border-b border-[#e2d6c8] px-3 py-3 text-left text-[0.75rem] uppercase tracking-[0.08em] text-[#42352f]">
                    備考
                  </th>
                </tr>
              </thead>
              <tbody className="max-sm:block">
                {filtered.map((row, index) => (
                  <tr
                    key={`${row.name}-${index}`}
                    className="max-sm:mb-4 max-sm:block max-sm:rounded-2xl max-sm:bg-white max-sm:px-4 max-sm:py-3 max-sm:shadow-[0_8px_18px_rgba(26,23,21,0.08)]"
                  >
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="カクテル名">
                      {row.name}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="ベース">
                      {row.base}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="技法">
                      {row.method}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="グラス">
                      {row.glass}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="氷">
                      {row.ice}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="材料">
                      {formatIngredients(row.ingredients)}
                    </td>
                    <td className="border-b border-[#e2d6c8] px-3 py-3 text-sm max-sm:flex max-sm:gap-3 max-sm:border-0 max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(data-label)] max-sm:before:min-w-[5.5rem] max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-[0.08em] max-sm:before:text-[#42352f]" data-label="備考">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
