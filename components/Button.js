export function Button({ className, content, action, isDisabled }) {
  return (
    <div className="flex">
      <button
        type="button"
        className={className}
        onClick={action}
        disabled={isDisabled}
      >
        {content}
      </button>
    </div>
  )
}