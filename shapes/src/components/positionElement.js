export default function position(el, x = 0, y = 0, r = 0) {
    let size = 1;
    if (y > 300) {
        size = 0.3;
    }
    el.animate(
        [
            {
                transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${size})`,
            },
            {
                transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${size})`,
            },
        ],
        {
            duration: 0,
            fill: "forwards",
        }
    );
}
