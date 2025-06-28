export default function Modal( { onConfirm, onCancel }) {  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 min-w-[300px]">
        <h2 className="text-xl font-semibold mb-2">Confirmation</h2>
        <p className="mb-6">Are you sure you want to continue?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 cursor-pointer rounded border border-gray-300 hover:bg-gray-100 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}