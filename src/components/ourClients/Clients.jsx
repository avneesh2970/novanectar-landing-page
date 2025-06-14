"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Button from "./Button"

// Import images - in Vite, place these in public/assets/clients/ folder
const images = [
  "../../assets/clients/1.png",
  "/assets/clients/2.png",
  "/assets/clients/3.png",
  "/assets/clients/4.png",
  "/assets/clients/5.png",
  "/assets/clients/6.png",
  "/assets/clients/7.png",
  "/assets/clients/8.png",
  "/assets/clients/9.png",
  "/assets/clients/10.png",
  "/assets/clients/12.png",
  "/assets/clients/13.png",
  "/assets/clients/14.png",
  "/assets/clients/15.png",
  "/assets/clients/16.png",
  "/assets/clients/17.png",
  "/assets/clients/18.png",
  "/assets/clients/19.png",
  "/assets/clients/20.png",
  "/assets/clients/21.png",
  "/assets/clients/22.png",
  "/assets/clients/24.png",
  "/assets/clients/25.png",
  "/assets/clients/26.png",
  "/assets/clients/27.png",
  "/assets/clients/28.png",
  "/assets/clients/29.png",
]

export default function Clients() {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  const imageSizes = [
    { id: 1, width: 150, height: 120 },
    { id: 2, width: 150, height: 120 },
    { id: 3, width: 150, height: 120 },
    { id: 4, width: 150, height: 120 },
    { id: 5, width: 150, height: 120 },
    { id: 6, width: 150, height: 120 },
    { id: 7, width: 150, height: 120 },
    { id: 8, width: 150, height: 120 },
    { id: 9, width: 150, height: 120 },
    { id: 10, width: 150, height: 120 },
    { id: 12, width: 150, height: 120 },
    { id: 13, width: 150, height: 120 },
    { id: 14, width: 150, height: 120 },
    { id: 15, width: 150, height: 120 },
    { id: 16, width: 150, height: 120 },
    { id: 17, width: 150, height: 120 },
    { id: 18, width: 150, height: 120 },
    { id: 19, width: 150, height: 120 },
    { id: 20, width: 150, height: 120 },
    { id: 21, width: 150, height: 120 },
    { id: 22, width: 150, height: 120 },
    { id: 24, width: 150, height: 120 },
    { id: 25, width: 150, height: 120 },
    { id: 26, width: 150, height: 120 },
    { id: 27, width: 150, height: 120 },
    { id: 28, width: 150, height: 120 },
    { id: 29, width: 150, height: 120 },
  ]

  const totalWidth = imageSizes.reduce((sum, size) => sum + size.width, 0) + (imageSizes.length - 1) * 16 // 16px for gap

  const scroll = useCallback(
    (direction) => {
      if (containerRef.current) {
        const scrollAmount = totalWidth / 4 // Scroll by 1/4 of the total width
        const currentScroll = containerRef.current.scrollLeft
        let newScroll

        if (direction === "left") {
          newScroll = currentScroll - scrollAmount
          if (newScroll < 0) {
            newScroll = totalWidth + newScroll
          }
        } else {
          newScroll = currentScroll + scrollAmount
          if (newScroll >= totalWidth) {
            newScroll = newScroll - totalWidth
          }
        }

        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        })
      }
    },
    [totalWidth],
  )

  const pauseAnimation = useCallback(() => {
    setIsAnimationPaused(true)
  }, [])

  const resumeAnimation = useCallback(() => {
    setIsAnimationPaused(false)
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.style.animationPlayState = isAnimationPaused ? "paused" : "running"
    }
  }, [isAnimationPaused])

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault() // Prevent the default context menu
    }

    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = () => {
        if (container.scrollLeft === 0) {
          container.scrollLeft = totalWidth
        } else if (container.scrollLeft === totalWidth * 2) {
          container.scrollLeft = totalWidth
        }
      }

      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [totalWidth])

  return (
    <section
      className="w-full py-14 px-4 bg-white relative"
      onMouseDown={pauseAnimation}
      onMouseUp={resumeAnimation}
      onMouseLeave={resumeAnimation}
      onTouchStart={pauseAnimation}
      onTouchEnd={resumeAnimation}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 mb-14 font-sans">
          <span className="inline-block relative">
            Our
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
          </span>{" "}
          <span className="inline-block">Trusted Clients</span>
        </h2>

        <div className="relative overflow-hidden">
          <Button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8249;
          </Button>

          <div
            ref={containerRef}
            className="overflow-hidden scroll-smooth"
            style={{
              width: `${totalWidth}px`,
            }}
          >
            <div
              ref={animationRef}
              className="flex items-center gap-4"
              style={{
                width: `${totalWidth * 3}px`,
                animation: `scroll ${totalWidth / 50}s linear infinite`,
              }}
            >
              {[...images, ...images, ...images].map((src, index) => {
                const size = imageSizes[index % imageSizes.length]
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center hover-shake"
                    style={{ width: size.width, height: size.height }}
                  >
                    <img
                      src={src || "/placeholder.svg"}
                      alt={`Client logo ${(index % images.length) + 1}`}
                      className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=120&width=150"
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8250;
          </Button>
        </div>
      </div>
    </section>
  )
}
