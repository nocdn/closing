import NumberFlow from "@number-flow/react"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

export default function App() {
  let ingredients = {
    ousegate: [
      { id: "kinder", ideal: 2, have: 0, name: "Kinder Bueno" },
      { id: "milk", ideal: 10, have: 0, name: "Milk Chocolate" },
      { id: "white", ideal: 8, have: 0, name: "White Chocolate" },
      { id: "terrys", ideal: 3, have: 0, name: "Chocolate Orange" },
      { id: "mars", ideal: 10, have: 0, name: "Mars Bar" },
      { id: "nutella", ideal: 10, have: 0, name: "Nutella", extraInfo: "jars" },
      { id: "peanut", ideal: 1, have: 0, name: "Peanut Butter", extraInfo: "jars" },
      { id: "biscoff", ideal: 3, have: 0, name: "Biscoff", extraInfo: "jars" },
      { id: "toffee", ideal: 1, have: 0, name: "Toffee Sauce" },
      { id: "salted", ideal: 1, have: 0, name: "Salted Caramel" },
      { id: "maple", ideal: 0, have: 0, name: "Maple Syrup" },
      { id: "golden", ideal: 2, have: 0, name: "Golden Syrup" },
      { id: "strawberry", ideal: 1, have: 0, name: "Strawberry Sauce" },
      { id: "sugar", ideal: 2, have: 0, name: "Sugar", extraInfo: "1 open, 1 full" },
      { id: "lemon", ideal: 1, have: 0, name: "Lemon Juice", extraInfo: "1 full" },
      { id: "cinnamon", ideal: null, have: 0, name: "Cinnamon" },
      { id: "marshmallows", ideal: 1, have: 0, name: "Marshmallows" },
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
        extraInfo: "is there a bag",
        isBoolean: true,
      },
      {
        id: "walnut",
        ideal: 1,
        have: 0,
        name: "Walnuts",
        extraInfo: "some walnuts in the bag",
        isBoolean: true,
      },
      { id: "passata", ideal: 1, have: 0, name: "Passata", extraInfo: "1 full" },
      { id: "pesto", ideal: 2, have: 0, name: "Pesto", extraInfo: "full" },
      { id: "oil", ideal: 1, have: 0, name: "Oil", extraInfo: "full" },
      { id: "bigCones", ideal: 3, have: 0, name: "Big Cones", messageName: "BIG CONES" },
      { id: "napkins", ideal: 3, have: 0, name: "Napkins" },
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
      { id: "foil", ideal: 1, have: 0, name: "Foil", extraInfo: "is there a roll" },
      {
        id: "rubbishBags",
        ideal: 1,
        have: 0,
        name: "Rubbish Bags",
        messageName: "RUBBISH BAGS 1/2 roll",
        extraInfo: "1/2 roll",
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
        extraInfo: "is there some water",
        isBoolean: true,
      },
      { id: "roll", ideal: 1, have: 0, name: "Roll" },
    ],
    kings: [],
  }

  const [location, setLocation] = useState<"" | "ousegate" | "kings">("")
  const [isDone, setIsDone] = useState(false)
  const [ingredientIndex, setIngredientIndex] = useState<number>(0)

  const [haveAmount, setHaveAmount] = useState(0)

  function submitAmount() {
    setHaveAmount(0)
    console.log("currently at index", ingredientIndex)
    console.log("length of ingredients", ingredients.ousegate.length)
    if (ingredientIndex === ingredients.ousegate.length - 1) {
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
    let text = ""
    for (let i = 0; i < ingredients.ousegate.length; i++) {
      const ingredientData = ingredients[location][i]
      const itemName = ingredientData.messageName ?? ingredientData.id.toUpperCase()
      const idealAmount = ingredientData.ideal
      // will never be negative, at most 0
      const neededAmount = Math.max(0, Number(ingredientData.ideal) - ingredientData.have)
      try {
        text += `\n${itemName},${idealAmount} - need - ${neededAmount}`
      } catch (err) {
        continue
      }
    }
    navigator.clipboard.writeText(text)
  }

  function increaseAmount() {
    if (location !== "" && ingredients[location][ingredientIndex].have < 10) {
      ingredients[location][ingredientIndex].have += 1
      setHaveAmount((prev) => prev + 1)
    }
  }

  function decreaseAmount() {
    if (location !== "" && ingredients[location][ingredientIndex].have > 0) {
      ingredients[location][ingredientIndex].have -= 1
      setHaveAmount((prev) => prev - 1)
    }
  }

  function stagedElements(location: "ousegate" | "kings") {
    const currentIngredient = ingredients[location][ingredientIndex]
    const isBoolean = currentIngredient.isBoolean
    return (
      <div className="mt-8 flex h-svh w-full flex-col items-center gap-12">
        <p className="capitalize opacity-70">{location}</p>
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
            <p className="font-rounded mt-6 w-full px-12 text-center text-2xl leading-[1.6] font-medium">
              How much{" "}
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
          {isBoolean ? (
            <>
              <button
                onMouseDown={() => {
                  setIngredientIndex((prev) => prev + 1)
                }}
                className="border-shadow font-rounded w-24 rounded-xl py-4 text-xl font-medium text-red-600 ring ring-white/15"
              >
                No
              </button>
              <button
                onMouseDown={() => {
                  currentIngredient.have = currentIngredient.ideal
                  setIngredientIndex((prev) => prev + 1)
                }}
                className="border-shadow font-rounded w-24 rounded-xl py-4 text-xl font-medium text-blue-600 ring ring-white/15"
              >
                Yes
              </button>
            </>
          ) : (
            <>
              <button className="rounded-xl p-5 ring ring-white/15" onMouseDown={decreaseAmount}>
                <Minus size={30} />
              </button>
              <div className="grid w-12 place-content-center text-4xl">
                <NumberFlow value={haveAmount} />
              </div>
              <button className="rounded-xl p-5 ring ring-white/15" onMouseDown={increaseAmount}>
                <Plus size={30} />
              </button>
            </>
          )}
        </div>
        {!isBoolean && (
          <button
            onMouseDown={submitAmount}
            className="font-rounded border-shadow mt-10 rounded-full bg-[#18181B] px-6 py-3 text-xl font-medium text-white dark:text-black"
          >
            Submit
          </button>
        )}
      </div>
    )
  }

  function finishScreen() {
    return <></>
  }

  return (
    <main className="flex flex-col items-center text-[16px]">
      {location === "" && !isDone && (
        <div className="grid h-svh w-screen place-content-center">
          <div id="buttons-container" className="flex flex-col items-center justify-center gap-5">
            <button
              onMouseDown={() => {
                setLocation("ousegate")
              }}
              className="border-shadow w-30 rounded-full bg-white py-3 font-medium text-gray-900 transition-transform duration-100 active:scale-[0.98]"
            >
              Ousegate
            </button>
            <p>or</p>
            <button
              onMouseDown={() => {
                setLocation("kings")
              }}
              className="border-shadow w-30 rounded-full bg-white py-3 font-medium text-gray-900 transition-transform duration-100 active:scale-[0.98]"
            >
              Kings
            </button>
          </div>
        </div>
      )}
      {location !== "" && stagedElements(location)}
      {isDone && (
        <div className="flex h-svh flex-col items-center justify-center gap-10">
          <p className="font-rounded w-full px-8 text-center text-5xl leading-[70px] font-medium">
            Message Copied!
          </p>
          <button
            onMouseDown={() => {
              setLocation("")
              setIsDone(false)
              setIngredientIndex(0)
            }}
            className="border-shadow font-rounded rounded-full bg-[#FEFEFE] px-6 py-3 text-lg font-medium"
          >
            Start Again
          </button>
        </div>
      )}
    </main>
  )
}
