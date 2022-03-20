export default function typewriter(node, { speed = 1, delay = 0 }) {
  const valid = (
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE
  );

  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child`)
  }

  const text = node.textContent
  const duration = text.length / (speed * 0.01)
  const fullDuration = duration + delay

  return {
    duration: fullDuration,
    tick: t => {
      const cursor = Math.max(0,(t*fullDuration - delay) / duration)
      const i = Math.trunc(text.length * cursor)
      node.textContent = text.slice(0, i)
    }
  }
}
