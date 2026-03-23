import NumberFlow from "@number-flow/react"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import { useWebHaptics } from "web-haptics/react"

let ingredients = {
  ousegate: [
    { id: "kinder", ideal: 2, have: 0, name: "Kinder Bueno" },
    { id: "milk", ideal: 10, have: 0, name: "Milk Chocolate", extraInfo: "bars" },
    { id: "white", ideal: 8, have: 0, name: "White Chocolate", extraInfo: "bars" },
    { id: "terrys", ideal: 3, have: 0, name: "Chocolate Orange" },
    { id: "mars", ideal: 10, have: 0, name: "Mars Bar" },
    { id: "nutella", ideal: 10, have: 0, name: "Nutella", extraInfo: "jars" },
    { id: "peanut", ideal: 1, have: 0, name: "Peanut Butter", extraInfo: "jars" },
    { id: "biscoff", ideal: 3, have: 0, name: "Biscoff", extraInfo: "jars" },
    { id: "toffee", ideal: 1, have: 0, name: "Toffee Sauce" },
    { id: "salted", ideal: 1, have: 0, name: "Salted Caramel" },
    { id: "maple", ideal: 2, have: 0, name: "Maple Syrup" },
    { id: "golden", ideal: 2, have: 0, name: "Golden Syrup" },
    { id: "strawberry", ideal: 1, have: 0, name: "Strawberry Sauce" },
    {
      id: "sugar",
      ideal: 1,
      have: 0,
      name: "Sugar",
      extraInfo: "1 open, 1 full",
      isBoolean: true,
    },
    { id: "lemon", ideal: 1, have: 0, name: "Lemon Juice", extraInfo: "full ones" },
    { id: "cinnamon", ideal: 1, have: 0, name: "Cinnamon Jars", messageName: "CINNAMON" },
    {
      id: "marshmallows",
      ideal: 1,
      have: 0,
      name: "Marshmallows",
      extraInfo: "at least 1/2 bag + full container",
      isBoolean: true,
    },
    {
      id: "appleWithSauce",
      ideal: 2,
      have: 0,
      name: "Apple With Sauce",
      messageName: "APPLE (with sauce)",
    },
    {
      id: "appleWithoutSauce",
      ideal: 1,
      have: 0,
      name: "Apple Without Sauce",
      messageName: "APPLE (without sauce)",
    },
    {
      id: "choppedNuts",
      ideal: 1,
      have: 0,
      name: "Chopped Nuts",
      messageName: "CHOPPED NUTS",
      extraInfo: "at least 1/2 bag",
      isBoolean: true,
    },
    {
      id: "walnut",
      ideal: 1,
      have: 0,
      name: "Walnuts",
      extraInfo: "at least 1/2 bag",
      isBoolean: true,
    },
    { id: "passata", ideal: 1, have: 0, name: "Passata", extraInfo: "full" },
    { id: "pesto", ideal: 2, have: 0, name: "Pesto Jars", extraInfo: "full" },
    { id: "oil", ideal: 1, have: 0, name: "Oil", extraInfo: "full bottles" },
    {
      id: "bigCones",
      ideal: 3,
      have: 0,
      name: "Big Cones",
      extraInfo: "Sets",
      messageName: "BIG CONES",
    },
    { id: "napkins", ideal: 3, have: 0, extraInfo: "Sets", name: "Napkins" },
    {
      id: "smallCones",
      ideal: 1,
      have: 0,
      name: "Small Cones",
      messageName: "SMALL CONES",
      extraInfo: "1/2 sleeve",
      isBoolean: true,
    },
    { id: "cloths", ideal: 3, have: 0, name: "Cloths" },
    {
      id: "foil",
      ideal: 1,
      have: 0,
      name: "Foil",
      isBoolean: true,
      extraInfo: "enough in the roll for next day",
    },
    {
      id: "rubbishBags",
      ideal: 1,
      have: 0,
      name: "Rubbish Bags",
      messageName: "RUBBISH BAGS 1/2 roll",
      extraInfo: "1/2 roll or 3 bags",
      isBoolean: true,
    },
    { id: "spray", ideal: 2, have: 0, name: "Spray" },
    {
      id: "gloves",
      ideal: 2,
      have: 0,
      name: "Gloves (L, M)",
      extraInfo: "both sizes",
      isBoolean: true,
    },
    {
      id: "waterForStick",
      ideal: 1,
      have: 0,
      name: "Water for Stick",
      messageName: "WATER FOR STICK",
      extraInfo: "1/2 bottle",
      isBoolean: true,
    },
    { id: "roll", ideal: 1, have: 0, name: "Roll" },
  ],
  kings: [
    { id: "kinder", ideal: 5, have: 0, name: "Kinder Bueno" },
    { id: "milk", ideal: 10, have: 0, name: "Milk Chocolate", extraInfo: "bars" },
    { id: "dark", ideal: 8, have: 0, name: "Dark Chocolate", extraInfo: "bars" },
    { id: "terrys", ideal: 8, have: 0, name: "Chocolate Orange" },
    { id: "mars", ideal: 12, have: 0, name: "Mars Bar" },
    { id: "nutella", ideal: 10, have: 0, name: "Nutella", extraInfo: "jars" },
    { id: "peanut", ideal: 1, have: 0, name: "Peanut Butter", extraInfo: "jars" },
    { id: "biscoff", ideal: 3, have: 0, name: "Biscoff", extraInfo: "jars" },
    { id: "toffee", ideal: 1, have: 0, name: "Toffee Sauce" },
    { id: "salted", ideal: 1, have: 0, name: "Salted Caramel" },
    { id: "maple", ideal: 2, have: 0, name: "Maple Syrup", extraInfo: "2-3 small" },
    { id: "golden", ideal: 3, have: 0, name: "Golden Syrup", extraInfo: "2-3 small" },
    { id: "strawberry", ideal: 1, have: 0, name: "Strawberry Sauce" },
    {
      id: "sugar",
      ideal: 1,
      have: 0,
      name: "Sugar",
      extraInfo: "1 open, 1 full",
      isBoolean: true,
    },
    { id: "lemon", ideal: 1, have: 0, name: "Lemon Juice", extraInfo: "full ones" },
    { id: "cinnamon", ideal: 1, have: 0, name: "Cinnamon Jars", messageName: "CINNAMON" },
    {
      id: "marshmallows",
      ideal: 1,
      have: 0,
      name: "Marshmallows",
      extraInfo: "at least 1/2 bag + full container",
      isBoolean: true,
    },
    {
      id: "appleWithSauce",
      ideal: 2,
      have: 0,
      name: "Apple With Sauce",
      messageName: "APPLE (with sauce)",
    },
    {
      id: "appleWithoutSauce",
      ideal: 1,
      have: 0,
      name: "Apple Without Sauce",
      messageName: "APPLE (without sauce)",
    },
    {
      id: "choppedNuts",
      ideal: 1,
      have: 0,
      name: "Chopped Nuts",
      messageName: "CHOPPED NUTS",
      extraInfo: "at least 1/2 bag",
      isBoolean: true,
    },
    {
      id: "walnut",
      ideal: 1,
      have: 0,
      name: "Walnuts",
      extraInfo: "at least 1/2 bag",
      isBoolean: true,
    },
    { id: "passata", ideal: 1, have: 0, name: "Passata", extraInfo: "full" },
    { id: "pesto", ideal: 2, have: 0, name: "Pesto Jars", extraInfo: "full" },
    { id: "oil", ideal: 1, have: 0, name: "Oil", extraInfo: "full bottles" },
    { id: "bigCones", ideal: 2, have: 0, name: "Big Cones" },
    { id: "napkins", ideal: 3, have: 0, name: "Napkins" },
    {
      id: "smallCones",
      ideal: 1,
      have: 0,
      name: "Small Cones",
      extraInfo: "1/2 sleeve",
      isBoolean: true,
    },
    { id: "cloths", ideal: 3, have: 0, name: "Cloths" },
    {
      id: "foil",
      ideal: 1,
      have: 0,
      name: "Foil",
      isBoolean: true,
      extraInfo: "enough in the roll for next day",
    },
    {
      id: "rubbishBags",
      ideal: 1,
      have: 0,
      name: "Rubbish Bags",
      messageName: "RUBBISH BAGS 1/2 roll",
      extraInfo: "1/2 roll or 3 bags",
      isBoolean: true,
    },
    { id: "spray", ideal: 2, have: 0, name: "Spray" },
    {
      id: "gloves",
      ideal: 1,
      have: 0,
      name: "Gloves (L, M)",
      isBoolean: true,
    },
    {
      id: "waterForStick",
      ideal: 1,
      have: 0,
      name: "Water for Stick",
      messageName: "WATER FOR STICK",
      extraInfo: "1/2 bottle",
      isBoolean: true,
    },
    { id: "roll", ideal: 1, have: 0, name: "Roll" },
  ],
}

export default function App() {
  const [location, setLocation] = useState<"" | "ousegate" | "kings">("")
  const [isDone, setIsDone] = useState(false)
  const [ingredientIndex, setIngredientIndex] = useState<number>(0)

  const [haveAmount, setHaveAmount] = useState(0)

  const [finishedList, setFinishedList] = useState("")
  const [copied, setCopied] = useState(false)

  const [glovesNeeded, setGlovesNeeded] = useState<"" | "L" | "M" | "L + M">("")

  const { trigger } = useWebHaptics()

  function submitAmount() {
    setHaveAmount(0)
    trigger()
    console.log("currently at index", ingredientIndex)
    if (location !== "" && ingredientIndex === ingredients[location].length - 1) {
      console.log("going to createMessage")
      createMessage(location)
      setIsDone(true)
      setLocation("")
    } else {
      console.log("increaseing index")
      setIngredientIndex((prev) => prev + 1)
    }
    console.log(ingredients)
  }

  function createMessage(location: "ousegate" | "kings" | "") {
    if (location === "") {
      throw new Error("No known location to write message for")
    }
    let text = `${location.toUpperCase()} CLOSE LIST\n`
    for (let i = 0; i < ingredients[location].length; i++) {
      const ingredientData = ingredients[location][i]
      const itemName = ingredientData.messageName ?? ingredientData.id.toUpperCase()
      // const idealAmount = ingredientData.ideal
      // will never be negative, at most 0
      if (ingredientData.id === "gloves") {
        try {
          text += `\n${itemName} - need - ${glovesNeeded}`
        } catch (err) {
          continue
        }
      } else {
        const neededAmount =
          ingredientData.ideal === null
            ? ""
            : Math.max(0, Number(ingredientData.ideal) - ingredientData.have)
        try {
          text += `\n${itemName} - need - ${neededAmount}`
        } catch (err) {
          continue
        }
      }
    }
    setFinishedList(text)
    navigator.clipboard.writeText(finishedList)
  }

  function increaseAmount() {
    if (location === "") return

    const item = ingredients[location][ingredientIndex]

    if (item.have < 10) {
      item.have += 1
      setHaveAmount(item.have)
    }
  }

  function decreaseAmount() {
    if (location === "") return

    const item = ingredients[location][ingredientIndex]

    if (item.have > 0) {
      item.have -= 1
      setHaveAmount(item.have)
    }
  }

  function goBack() {
    trigger()
    if (ingredientIndex > 0) {
      setIngredientIndex((prev) => prev - 1)
    }
  }

  function stagedElements(location: "ousegate" | "kings") {
    const currentIngredient = ingredients[location][ingredientIndex]
    const isBoolean = currentIngredient.isBoolean
    const isGloves = currentIngredient.id == "gloves"
    return (
      <div className="flex h-svh w-full flex-col items-center gap-12">
        <p className="font-rounded mt-8 capitalize opacity-70">{location}</p>
        {isBoolean ? (
          <>
            <p className="font-rounded mt-6 w-full px-12 text-center text-2xl leading-[1.6] font-medium">
              Do we have{" "}
              <span className="text-blue-500">{ingredients[location][ingredientIndex]?.name}</span>{" "}
              <span className="opacity-50">
                {ingredients[location][ingredientIndex].extraInfo && (
                  <>({ingredients[location][ingredientIndex]?.extraInfo})</>
                )}
              </span>{" "}
            </p>
          </>
        ) : (
          <>
            <p className="font-rounded mt-6 w-full px-14 text-center text-2xl leading-[1.6] font-medium">
              How many{" "}
              <span className="text-blue-500">{ingredients[location][ingredientIndex]?.name}</span>{" "}
              <span className="text-amber-600/80">
                {ingredients[location][ingredientIndex].extraInfo && (
                  <>({ingredients[location][ingredientIndex]?.extraInfo})</>
                )}
              </span>{" "}
              do we have?
            </p>
          </>
        )}

        <div className="flex items-center gap-8">
          {isBoolean && !isGloves && (
            <>
              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded w-24 rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-red-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                No
              </button>
              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    currentIngredient.have = currentIngredient.ideal
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded w-24 rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-blue-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                Yes
              </button>
            </>
          )}{" "}
          {!isBoolean && (
            <>
              <button
                className="rounded-xl p-5 ring ring-white/15 dark:ring-0"
                onMouseDown={decreaseAmount}
              >
                <Minus size={30} />
              </button>
              <div className="grid w-12 place-content-center text-4xl">
                <NumberFlow value={haveAmount} />
              </div>
              <button
                className="rounded-xl p-5 ring ring-white/15 dark:ring-0"
                onMouseDown={increaseAmount}
              >
                <Plus size={30} />
              </button>
            </>
          )}
          {isGloves && (
            <>
              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    setGlovesNeeded("M")
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded flex items-center gap-1 rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-blue-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                <span className="mr-1 opacity-30">Need:</span>{" "}
                <span className="font-semibold">M</span>
              </button>

              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    setGlovesNeeded("L")
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded flex items-center gap-1 rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-blue-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                <span className="mr-1 opacity-30">Need:</span>
                <span className="font-semibold">L</span>
              </button>
              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    setGlovesNeeded("L + M")
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-blue-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                Both Needed
              </button>
              <button
                onMouseDown={() => {
                  trigger()
                  if (ingredientIndex === ingredients[location].length - 1) {
                    createMessage(location)
                    setIsDone(true)
                    setLocation("")
                  } else {
                    setIngredientIndex((prev) => prev + 1)
                  }
                }}
                className="font-rounded rounded-full bg-[#f0f0f09f] px-6 py-3 text-xl font-medium text-blue-600 ring ring-white/7 active:opacity-40 dark:bg-[#18181B]"
              >
                Neither Needed
              </button>
            </>
          )}
        </div>
        {!isBoolean && (
          <button
            onMouseDown={submitAmount}
            className="font-rounded border-shadow mt-2 rounded-full bg-[#18181B] px-6 py-3 text-xl font-medium text-white active:opacity-40 dark:text-white"
          >
            Submit
          </button>
        )}
        {ingredientIndex > 0 && (
          <button
            className="font-rounded border-shadow mt-auto mb-12 rounded-full bg-[#18181B] px-6 py-3 text-[17px] font-medium text-white active:opacity-40 dark:text-white"
            onMouseDown={goBack}
          >
            Back
          </button>
        )}
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center text-[16px]">
      {location === "" && !isDone && (
        <div className="grid h-svh w-screen place-content-center">
          <div id="buttons-container" className="flex flex-col items-center justify-center gap-5">
            <button
              onMouseDown={() => {
                trigger()
                setLocation("ousegate")
              }}
              className="border-shadow w-30 rounded-full bg-white py-3 font-medium text-gray-900 transition-transform duration-100 active:scale-[0.98]"
            >
              Ousegate
            </button>
            <p>or</p>
            <button
              onMouseDown={() => {
                trigger()
                setLocation("kings")
              }}
              className="border-shadow w-30 rounded-full bg-white py-3 font-medium text-gray-900 transition-transform duration-100 active:scale-[0.98]"
            >
              Kings
            </button>
          </div>
        </div>
      )}
      {location !== "" && !isDone && stagedElements(location)}
      {isDone && (
        <div className="flex h-svh w-screen flex-col items-center justify-center gap-10">
          <p className="font-rounded w-full px-8 text-center text-xl leading-17.5 font-medium">
            Finished list:
          </p>
          <div className="w-full px-12">
            <textarea
              name=""
              id=""
              className="border-shadow text-foreground block h-80 w-full resize-none overscroll-auto! rounded-xl bg-white p-3 focus:outline-none dark:bg-[#101010]"
              readOnly
              value={finishedList}
            />
          </div>
          <button
            onMouseDown={() => {
              navigator.clipboard.writeText(finishedList)
              trigger()
              setCopied(true)
              setTimeout(() => {
                setCopied(false)
              }, 1000)
            }}
            className="border-shadow font-rounded rounded-full bg-[#FEFEFE] px-6 py-3 text-lg font-medium dark:text-black"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onMouseDown={() => {
              trigger()
              setLocation("")
              setIsDone(false)
              setIngredientIndex(0)
            }}
            className="border-shadow font-rounded rounded-full bg-[#FEFEFE] px-6 py-3 text-lg font-medium dark:text-black"
          >
            Start Again
          </button>
        </div>
      )}
    </main>
  )
}
