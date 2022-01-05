import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const networksList = () => {
  const NEXT_PUBLIC_NETWORK_WHITELIST = process.env.NEXT_PUBLIC_NETWORK_WHITELIST
  const NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_HOST_URL

  const networksIconUrl = {
    goerli: `${NEXT_PUBLIC_HOST_URL}/eth-crypto-icon.png`,
    mumbai: `${NEXT_PUBLIC_HOST_URL}/matic-crypto-icon.png`,
    sokol: `${NEXT_PUBLIC_HOST_URL}/xdai-crypto-icon.png`
  }

  let networkArray = []
  NEXT_PUBLIC_NETWORK_WHITELIST.split(',').map((network, i) => {
    networkArray.push({ id: ++i, name: network, icon: networksIconUrl[network] || '' })
  })

  return networkArray
}

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export function SelectNetwork({ network, setNetwork }) {
  const [networksItems, setNetworksItems] = useState(networksList())
  const [selected, setSelected] = useState(networksItems[0])

  useEffect(() => {
    setNetwork(selected.name.toLowerCase())
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-xs text-[#2B2B2B]">Assigned to</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <div className="flex items-center">

              <img src={selected.icon} alt="network icon" className="flex-shrink-0 h-6 w-6 rounded-full mr-3" />
              <span className="flex items-center">
                <span className=" block truncate text-select">{selected.name}</span>
              </span>
            </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-select" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {networksItems.map((network) => (
                  <Listbox.Option
                    key={network.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-select bg-indigo-300' : 'text-gray-800',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={network}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={network.icon} alt="network icon" className="flex-shrink-0 h-6 w-6 rounded-full mr-3" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate',  active ? 'text-white w-full bg-indigo-300' : 'w-full text-gray-800 bg-bgselect')}
                          >
                            {network.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-300',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}