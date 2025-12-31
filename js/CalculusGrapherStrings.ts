// Copyright 2020-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import calculusGrapher from './calculusGrapher.js';

type StringsType = {
  'calculus-grapher': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'derivativeStringProperty': LocalizedStringProperty;
    'integralStringProperty': LocalizedStringProperty;
    'advancedStringProperty': LocalizedStringProperty;
    'labStringProperty': LocalizedStringProperty;
  };
  'smoothStringProperty': LocalizedStringProperty;
  'symbol': {
    'dStringProperty': LocalizedStringProperty;
    'fStringProperty': LocalizedStringProperty;
    'xStringProperty': LocalizedStringProperty;
    'tStringProperty': LocalizedStringProperty;
  };
  'discontinuitiesStringProperty': LocalizedStringProperty;
  'valuesStringProperty': LocalizedStringProperty;
  'notationStringProperty': LocalizedStringProperty;
  'lagrangeStringProperty': LocalizedStringProperty;
  'leibnizStringProperty': LocalizedStringProperty;
  'variableStringProperty': LocalizedStringProperty;
  'checkbox': {
    'areaUnderCurveStringProperty': LocalizedStringProperty;
    'tangentStringProperty': LocalizedStringProperty;
  };
  'barometer': {
    'netSignedAreaStringProperty': LocalizedStringProperty;
    'slopeOfTangentStringProperty': LocalizedStringProperty;
  };
  'predictStringProperty': LocalizedStringProperty;
  'showStringProperty': LocalizedStringProperty;
  'predictPreferenceStringProperty': LocalizedStringProperty;
  'valuesPreferenceDescriptionStringProperty': LocalizedStringProperty;
  'predictPreferenceDescriptionStringProperty': LocalizedStringProperty;
  'referenceLineStringProperty': LocalizedStringProperty;
  'curveManipulator': {
    'keyboardHelpHeadingStringProperty': LocalizedStringProperty;
    'keyboardHelpLabelStringProperty': LocalizedStringProperty;
    'keyboardCueStringProperty': LocalizedStringProperty;
  };
  'a11y': {
    'derivativeScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetailsStringProperty': LocalizedStringProperty;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'integralScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetailsStringProperty': LocalizedStringProperty;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'advancedScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetailsStringProperty': LocalizedStringProperty;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'labScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetailsStringProperty': LocalizedStringProperty;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'gridCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'smoothButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'eraserButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'undoButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'eyeToggleButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseOffStringProperty': LocalizedStringProperty;
      'accessibleContextResponseOnStringProperty': LocalizedStringProperty;
    };
    'yZoomButtonGroup': {
      'zoomInButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'zoomOutButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'tangentCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'referenceLineCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'areaUnderCurveCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'variableRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'xRadioButton': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'tRadioButton': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'notationRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'lagrangeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'leibnizRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'discontinuitiesRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'noLineRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'dashedLineRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'predictToggleSwitch': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'curveManipulationWidthSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'curveManipulationModeRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'hillRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'triangleRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'pedestalRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'parabolaRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'sinusoidRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'freeformRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'tiltRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'shiftRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'graphSetRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'integralRadioButton': {
        'advanced': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        };
        'lab': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        }
      };
      'derivativeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'secondDerivativeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'slopeOfTangentAccordionBox': {
      'accessibleHelpTextCollapsedStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'netSignedAreaAccordionBox': {
      'accessibleHelpTextCollapsedStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'originalGraph': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'integralGraph': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'derivativeGraph': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'secondDerivativeGraph': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'predictRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'originalCurveRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'predictCurveRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'showOriginalCurveCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'tangentScrubber': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'referenceLineScrubber': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'areaUnderCurveScrubber': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'curveManipulatorNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'headings': {
      'graphAreasStringProperty': LocalizedStringProperty;
      'curveManipulationControlsStringProperty': LocalizedStringProperty;
      'toolControlsStringProperty': LocalizedStringProperty;
      'curveExplorationToolsStringProperty': LocalizedStringProperty;
    }
  }
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
