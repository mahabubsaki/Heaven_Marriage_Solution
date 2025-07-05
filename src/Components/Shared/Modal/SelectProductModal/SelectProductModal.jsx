import React, { useState } from "react";
import DragCloseDrawer from "./DragCloseDrawer";

export const DragCloseDrawerExample = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="grid h-screen place-content-center bg-neutral-950">
            <button
                onClick={() => setOpen(true)}
                className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
            >
                Open drawer
            </button>

            <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
                    <h2 className="text-4xl font-bold text-neutral-200">
                        Drag the handle at the top of this modal downwards 100px to close it
                    </h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
                        laboriosam quos deleniti veniam est culpa quis nihil enim suscipit
                        nulla aliquid iure optio quaerat deserunt, molestias quasi facere
                        aut quidem reprehenderit maiores.
                    </p>
                    um, fugit.
                </div>
            </DragCloseDrawer >
        </div >
    );
};

