// Behaviour shared by every page. Page-specific scripts are imported by their section components.
import { initButtonCharacterStagger } from './button-chars';
import { initCurrentYear } from './current-year';
import { initInteractions } from './interactions';
import { initNavigation, initNavTone } from './navigation';
import { initParallax } from './parallax';
import { initSmoothScroll } from './smooth-scroll';
import { initTextFit } from './text-fit';

initSmoothScroll();
initButtonCharacterStagger();
initNavigation();
initNavTone();
initCurrentYear();
initParallax();
initTextFit();
initInteractions();
