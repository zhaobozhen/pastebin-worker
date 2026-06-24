import React, { createContext } from "react"

interface TabsContextValue {
  selectedKey: string
  onSelectionChange: (key: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export interface TabsProps {
  selectedKey: string
  onSelectionChange: (key: string) => void
  children: React.ReactNode
  variant?: string
  classNames?: {
    base?: string
    tabList?: string
    cursor?: string
    tab?: string
    panel?: string
  }
}

export function Tabs({ selectedKey, onSelectionChange, children, classNames = {} }: TabsProps) {
  const tabs = React.Children.toArray(children).filter((child): child is React.ReactElement =>
    React.isValidElement(child),
  )

  return (
    <TabsContext.Provider value={{ selectedKey, onSelectionChange }}>
      <div className={classNames.base}>
        <div className={`flex ${classNames.tabList || ""}`}>
          {tabs.map((tab, index) => {
            const tabKey = tab.key?.toString().replace(/^\.\$/, "") || `tab-${index}`
            const isSelected = selectedKey === tabKey
            return (
              <button
                key={tabKey}
                onClick={() => onSelectionChange(tabKey)}
                className={`text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-default-400 rounded-sm ${isSelected ? "text-default-700" : "text-default-500 hover:text-default-700"} ${classNames.tab || ""}`}
              >
                <span className="relative inline-block pb-1">
                  {(tab.props as { title: string }).title}
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 bottom-0 h-[2px] bg-default-700 ${classNames.cursor || ""}`}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <div className={classNames.panel}>
          {tabs.find((tab, index) => {
            const tabKey = tab.key?.toString().replace(/^\.\$/, "") || `tab-${index}`
            return selectedKey === tabKey
          })}
        </div>
      </div>
    </TabsContext.Provider>
  )
}

export interface TabProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function Tab({ children, className = "" }: TabProps) {
  return <div className={className}>{children}</div>
}
