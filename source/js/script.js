const navigation = document.querySelector(".site-navigation");
const burger = navigation.querySelector(".button-burger");
const burgerIcon = burger.querySelector(".button-burger__icon");
const menu = navigation.querySelector(".site-navigation__list");

const imageMixer = document.querySelector("#image-mixer__range")
const leftImage = document.querySelector(".image-mixer__photo--before")
const rightImage = document.querySelector(".image-mixer__photo--after")

const desktopQuery = window.matchMedia('(min-width: 1280px)')
const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1279px)')
const mobileQuery = window.matchMedia('(max-width: 767px)')

if(imageMixer){
  const defaultClip = {
    left: window.getComputedStyle(leftImage).clip,
    right: window.getComputedStyle(rightImage).clip,
    isMobile: false
  }

  const getClipByStringAndPercent = (clipString, percent) => {
    cleanedClip = clipString.replace(/rect|\s|\(|\)|px/gi, '')
    clips = cleanedClip.split(',').map(it => {
      const condidate = parseInt(it)
      if (condidate) return Math.round(condidate / 100 * percent * 2)
      else return it
    })
    const result = `rect(${clips.map(c => {
      if (typeof c === "number") {
          return `${c}px`
      }
      else {
        return `${c}`
      }
      }).join(', ')})`
    return result
  }

  imageMixer.addEventListener("input", (evt) => {
    const value = evt.target.value;
    if (!defaultClip.isMobile) {
      leftImage.style.clip = getClipByStringAndPercent(defaultClip.left, value)
      rightImage.style.clip = getClipByStringAndPercent(defaultClip.right, value)
    } else {
      leftImage.style.clip = ''
      rightImage.style.clip = ''
      if(value < 50){
        leftImage.style.display = 'none'
        rightImage.style.display = 'block'
      }
      else {
        leftImage.style.display = 'block'
        rightImage.style.display = 'none'
      }
    }
  })

  desktopQuery.onchange = () => {
    if (desktopQuery.matches) {
      leftImage.style.display = 'block'
      rightImage.style.display = 'block'
      imageMixer.step = '1'
      defaultClip.isMobile = false
      defaultClip.left = window.getComputedStyle(leftImage).clip
      defaultClip.right = window.getComputedStyle(rightImage).clip
      leftImage.style.clip = "rect(auto, 364px, auto, auto)"
      rightImage.style.clip = "rect(auto, auto, auto, 364px)"
      imageMixer.value = 50
      }
  }

  tabletQuery.onchange = () => {
    if (tabletQuery.matches) {
      leftImage.style.display = 'block'
      rightImage.style.display = 'block'
      imageMixer.step = '1'
      defaultClip.isMobile = false
      leftImage.style.clip = "rect(auto, 354px, auto, auto)"
      rightImage.style.clip = "rect(auto, auto, auto, 354px)"
      imageMixer.value = 50
      defaultClip.left = window.getComputedStyle(leftImage).clip
      defaultClip.right = window.getComputedStyle(rightImage).clip
      }
  }

  mobileQuery.onchange = () => {
    if (mobileQuery.matches) {
      imageMixer.step = '100'
      defaultClip.isMobile = true
    }
  }
}

burger.addEventListener("click", () => {
  burgerIcon.classList.toggle("button-burger__icon--close");
  menu.classList.toggle("site-navigation__list--active");
  navigation.classList.toggle("site-navigation--closed");
});
