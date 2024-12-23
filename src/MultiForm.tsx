import { useState } from "react"

const MultiStepForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    material: string
    itemType: string
    size: string
    chainLength: string
    chainType: {
      name?: string
      imageURL?: string
    }
    addStone: boolean
    stoneType: {
      name?: string
      imageURL?: string
    }
    uploadedFile: string | null
    notes: string
  }>({
    material: "",
    itemType: "",
    size: "",
    chainLength: "",
    chainType: {},
    addStone: false,
    stoneType: {},
    uploadedFile: null,
    notes: "",
  })
  const [preview, setPreview] = useState<string>("")

  const materials = [
    "18k Yellow Gold",
    "18k Rose Gold",
    "18k White Gold",
    "21k Yellow Gold",
    "Silver",
  ]

  const itemTypes = [
    "Necklace",
    "Earring",
    "Ring",
    "Bracelet",
    "Bangle",
    "Pendant",
    "Anklet",
  ]

  const stones = [
    {
      name: "Malachite",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "White MOP",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "Gray MOP",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "Lapiz",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
  ]

  const chainTypes = [
    {
      name: "Type 1",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "Type 2",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "Type 3",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
    {
      name: "Type 4",
      imageURL: "https://i.ebayimg.com/images/g/7z4AAOSw~uxkRsZA/s-l1200.jpg",
    },
  ]

  const handleNext = () => {
    if (step < 6) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    setFormData({ ...formData, uploadedFile: file })
    setPreview(URL.createObjectURL(file))
  }

  //   const handleSubmit = () => {
  //     alert(`
  //       Your custom piece:
  //       Material: ${formData.material}
  //       Item Type: ${formData.itemType}
  //       Size: ${formData.size || "Not specified"}
  //       Chain Length: ${formData.chainLength || "Not specified"}
  //       Chain Type: ${formData.chainType.name || "Not specified"}
  //       Add Stone: ${
  //         formData.addStone ? `Yes (${formData.stoneType.name})` : "No"
  //       }
  //       Stone Type: ${formData.stoneType.name || "Not selected"}
  //       Uploaded File: ${formData.uploadedFile?.name || "No file uploaded"}
  //       Notes: ${formData.notes || "No special requests"}
  //     `)
  //   }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-screen-xl mx-auto px-2 ">
            <h2 className="text-2xl font-semibold mb-6">
              Step 1: Choose Material
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:gap-6 gap-4">
              {materials.map((material, index) => (
                <button
                  key={index}
                  className={`py-3 px-6 border rounded-lg text-center ${
                    formData.material === material
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setFormData({ ...formData, material })}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="w-full max-w-screen-xl mx-auto  px-2">
            <h2 className="text-2xl font-semibold mb-6">
              Step 2: Choose Item Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:gap-6 gap-4">
              {itemTypes.map((type, index) => (
                <button
                  key={index}
                  className={`py-3 px-6 border rounded-lg text-center ${
                    formData.itemType === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      itemType: type,
                      size: "",
                      chainLength: "",
                      chainType: {},
                    })
                  }
                >
                  {type}
                </button>
              ))}
            </div>
            {(formData.itemType === "Ring" ||
              formData.itemType === "Bangle") && (
              <div className="mt-4">
                <label className="block text-gray-700">Enter Size:</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border rounded-lg"
                  placeholder="Size (e.g., 6, 7, etc.)"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                />
              </div>
            )}
            {(formData.itemType === "Necklace" ||
              formData.itemType === "Bracelet") && (
              <div className="mt-4">
                <label className="block text-gray-700">Chain Length:</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border rounded-lg"
                  placeholder="Length (e.g., 16, 18 inches)"
                  value={formData.chainLength}
                  onChange={(e) =>
                    setFormData({ ...formData, chainLength: e.target.value })
                  }
                />
                <label className="block text-gray-700 mt-4 mb-2">
                  Chain Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {chainTypes.map((type, index) => (
                    <div>
                      <button
                        style={{
                          backgroundImage: `url('${type.imageURL}')`,
                        }}
                        key={index}
                        className={`w-full bg-cover bg-no-repeat min-h-[200px] py-3 px-6  rounded-lg border-2 text-center ${
                          formData.chainType.name === type.name
                            ? "border-blue-500 text-white"
                            : "border-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, chainType: type })
                        }
                      >
                        {/* <img
                      src={stone.imageURL}
                      alt={stone.name}
                      className="w-12 h-12 mx-auto"
                    /> */}
                      </button>
                      <p className="text-center mt-2">{type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      case 3:
        return (
          <div className="w-full max-w-screen-xl mx-auto  px-2">
            <h2 className="text-2xl font-semibold mb-6">
              Step 3: Add a Stone (Optional)
            </h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Add a Stone?</label>
              <input
                type="checkbox"
                checked={formData.addStone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addStone: e.target.checked,
                    stoneType: {},
                  })
                }
              />
            </div>
            {formData.addStone && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stones.map((stone, index) => (
                  <div>
                    <button
                      style={{
                        backgroundImage: `url('${stone.imageURL}')`,
                      }}
                      key={index}
                      className={`w-full bg-cover bg-no-repeat min-h-[200px] py-3 px-6  rounded-lg border-2 text-center ${
                        formData.stoneType.name === stone.name
                          ? "border-blue-500 text-white"
                          : "border-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, stoneType: stone })
                      }
                    >
                      {/* <img
                      src={stone.imageURL}
                      alt={stone.name}
                      className="w-12 h-12 mx-auto"
                    /> */}
                    </button>
                    <p className="text-center mt-2">{stone.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      case 4:
        return (
          <div className="w-full max-w-screen-xl mx-auto  px-2">
            <h2 className="text-2xl font-semibold mb-6">
              Step 4: Upload Image (Optional)
            </h2>
            <div className="flex flex-col items-center">
              <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-[320px] h-[320px] mb-4"
                />
              )}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="w-full max-w-screen-xl mx-auto  px-2">
            <h2 className="text-2xl font-semibold mb-6">
              Step 5: Review Your Choices
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Material:</strong> {formData.material}
              </p>
              <p>
                <strong>Item Type:</strong> {formData.itemType}
              </p>
              <p>
                <strong>Size:</strong> {formData.size || "Not specified"}
              </p>
              <p>
                <strong>Chain Length:</strong>{" "}
                {formData.chainLength || "Not specified"}
              </p>
              <p>
                <strong>Chain Type:</strong>{" "}
                {formData.chainType.name || "Not selected"}
              </p>
              <p>
                <strong>Stone Type:</strong>{" "}
                {formData.stoneType.name || "Not selected"}
              </p>
              {formData.uploadedFile && (
                <div>
                  <strong>Uploaded File:</strong>
                  <img
                    src={preview}
                    alt="Uploaded File"
                    className="w-32 h-32 mt-2"
                  />
                </div>
              )}
              <p>
                <strong>Notes:</strong>{" "}
                {formData.notes || "No special requests"}
              </p>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="w-full max-w-screen-xl mx-auto  px-2">
            <h2 className="text-2xl font-semibold mb-6">
              Step 6: Submit Order
            </h2>
            <p>Your order has been successfully submitted!</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="fixed w-full start-0 top-0 flex items-center bg-[#A8A8A8] py-8 px-4">
        <p className="text-5xl text-[#EAEAEA]">LOGO</p>
      </div>
      <div className="w-full flex flex-col bg-white shadow-lg pt-[120px] pb-12 min-h-full">
        <div className="flex-grow h-full p-2 md:p-8">{renderStep()}</div>
        <div className=" fixed bottom-0 start-0  w-full bg-gray-200 p-4 flex justify-between">
          <button
            className="bg-gray-400 text-white px-6 py-3 rounded-lg"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300"
            onClick={handleNext}
            disabled={step === 6}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultiStepForm
