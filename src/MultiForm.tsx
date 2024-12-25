import { useState } from "react"
import {
  bangleSizeOptions,
  chainLengthBraceletOptions,
  chainLengthNecklaceOptions,
  chainTypes,
  itemTypes,
  materials,
  ringSizeOptions,
  stones,
  itemTypesT,
  earringPushbackTypes,
} from "./constants"

const MultiStepForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    material: string
    itemType: itemTypesT | null
    size: string
    chainLength: string
    chainType: string
    addStone: boolean
    stoneType: string
    uploadedFile: string | null
    notes: string
    earringPushbackType: string
  }>({
    material: "",
    itemType: null,
    size: "",
    chainLength: "",
    chainType: "",
    addStone: false,
    stoneType: "",
    uploadedFile: null,
    notes: "",
    earringPushbackType: "",
  })
  const totalSteps = 6
  const stepsActivationRules = [
    formData.material,
    formData.itemType &&
      ((["Bangle", "Ring"].includes(formData.itemType) && formData.size) ||
        (["Earring"].includes(formData.itemType) &&
          formData.earringPushbackType) ||
        (["Necklace", "Bracelet", "Anklet"].includes(formData.itemType) &&
          formData.chainLength &&
          formData.chainType) ||
        ["Pendant"].includes(formData.itemType)),
  ]
  const [preview, setPreview] = useState<string>("")

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
    if (step === totalSteps) {
      setStep(1)
      setPreview("")
      setFormData({
        material: "",
        itemType: null,
        size: "",
        chainLength: "",
        chainType: "",
        addStone: false,
        stoneType: "",
        uploadedFile: null,
        notes: "",
        earringPushbackType: "",
      })
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    setFormData({ ...formData, uploadedFile: file })
    setPreview(URL.createObjectURL(file))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-screen-xl mx-auto px-2 ">
            <h2 className="text-2xl font-semibold mb-6">
              Step {step}: Choose Material
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:gap-6 gap-4">
              {materials.map((material, index) => (
                <button
                  key={index}
                  className={`py-3 px-6 border rounded-lg text-center ${
                    formData.material === material
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-200"
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
              Step {step}: Choose Item Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:gap-6 gap-4">
              {itemTypes.map((type, index) => (
                <button
                  key={index}
                  className={`py-3 px-6 border rounded-lg text-center ${
                    formData.itemType === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      itemType: type,
                      size: "",
                      chainLength: "",
                      chainType: "",
                      earringPushbackType: "",
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
                <select
                  className="w-full mt-2 p-3 border rounded-lg"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Length (e.g., 16, 18 inches)
                  </option>
                  {(formData.itemType === "Ring"
                    ? ringSizeOptions
                    : bangleSizeOptions
                  ).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(formData.itemType === "Necklace" ||
              formData.itemType === "Bracelet") && (
              <div className="mt-4">
                <label className="block text-gray-700">Chain Length:</label>
                <select
                  className="w-full mt-2 p-3 border rounded-lg"
                  value={formData.chainLength}
                  onChange={(e) =>
                    setFormData({ ...formData, chainLength: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Length (e.g., 16, 18 inches)
                  </option>
                  {(formData.itemType === "Necklace"
                    ? chainLengthNecklaceOptions
                    : chainLengthBraceletOptions
                  ).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label className="block text-gray-700 mt-4 mb-2">
                  Chain Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {chainTypes.map((type, index) => (
                    <div key={index}>
                      <button
                        style={{
                          backgroundImage: `url('${type.imageURL}')`,
                        }}
                        className={`w-full bg-cover bg-no-repeat aspect-square py-3 px-6  rounded-lg border-2 text-center ${
                          formData.chainType === type.name
                            ? "border-blue-500 text-white"
                            : "border-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, chainType: type.name })
                        }
                      />
                      <p className="text-center mt-2">{type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {formData.itemType === "Earring" && (
              <div className="mt-4">
                <label className="block text-gray-700 mt-4 mb-2">
                  Pushback Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {earringPushbackTypes.map((type, index) => (
                    <div key={index}>
                      <button
                        style={{
                          backgroundImage: `url('${type.imageURL}')`,
                        }}
                        className={`w-full bg-cover bg-no-repeat aspect-square py-3 px-6  rounded-lg border-2 text-center ${
                          formData.earringPushbackType === type.name
                            ? "border-blue-500 text-white"
                            : "border-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            earringPushbackType: type.name,
                          })
                        }
                      />
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
              <label className="mr-4 text-gray-700 font-medium">
                Add a Stone?
              </label>
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    addStone: !formData.addStone,
                    stoneType: "",
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.addStone ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.addStone ? "translate-x-6" : "translate-x-1"
                  }`}
                ></span>
              </button>
            </div>
            {formData.addStone && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stones.map((stone, index) => (
                  <div key={index}>
                    <button
                      style={{
                        backgroundImage: `url('${stone.imageURL}')`,
                      }}
                      className={`w-full bg-cover aspect-square bg-no-repeat py-3 px-6  rounded-lg border-2 text-center ${
                        formData.stoneType === stone.name
                          ? "border-blue-500 text-white"
                          : "border-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, stoneType: stone.name })
                      }
                    />
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
                  className="w-[320px] h-[320px] mt-4"
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
                {formData.chainType || "Not selected"}
              </p>
              <p>
                <strong>Stone Type:</strong>{" "}
                {formData.stoneType || "Not selected"}
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
            <p>Your order has been successfully submitted!</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-gray-200">
      <div className="fixed w-full start-0 top-0 flex items-center bg-white py-2 px-4 shadow-sm  justify-center z-[10]">
        <img src="/latia-logo.png" alt="logo" className="w-[170px] " />
      </div>
      <div className="w-full flex flex-col bg-gray-50 shadow-lg pt-[120px] pb-20 min-h-full">
        <div className="flex-grow h-full p-2 md:p-8">{renderStep()}</div>
        <div className=" fixed bottom-0 start-0  w-full bg-gray-200 p-4 flex justify-between">
          {step !== totalSteps ? (
            <button
              className={` text-white px-6 py-3 rounded-lg ${
                step === totalSteps ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300"
            onClick={handleNext}
            disabled={!stepsActivationRules[step - 1]}
          >
            {step === totalSteps - 1
              ? "Submit"
              : step === totalSteps
              ? "Create Another Order"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultiStepForm
