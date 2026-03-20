// Copyright 2020-2026, University of Colorado Boulder

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
  'curveManipulatorKeyboardCueStringProperty': LocalizedStringProperty;
  'keyboardHelp': {
    'curveManipulatorStringProperty': LocalizedStringProperty;
    'grabOrReleaseCurveStringProperty': LocalizedStringProperty;
    'tangentToolOrReferenceLineStringProperty': LocalizedStringProperty;
    'areaUnderCurveToolOrReferenceLineStringProperty': LocalizedStringProperty;
    'referenceLineStringProperty': LocalizedStringProperty;
  };
  'a11y': {
    'screens': {
      'defaults': {
        'screenSummary': {
          'currentDetails': {
            'leadingParagraph': {
              'widthPatternStringProperty': LocalizedStringProperty;
              'noWidthPatternStringProperty': LocalizedStringProperty;
              'curveSentence': {
                'curvesShownStringProperty': LocalizedStringProperty;
                'allCurvesHiddenStringProperty': LocalizedStringProperty;
              }
            };
            'accessibleList': {
              'primaryStringProperty': LocalizedStringProperty;
              'predictStringProperty': LocalizedStringProperty;
              'integralStringProperty': LocalizedStringProperty;
              'derivativeStringProperty': LocalizedStringProperty;
              'secondDerivativeStringProperty': LocalizedStringProperty;
            }
          };
          'controlAreaStringProperty': LocalizedStringProperty;
        }
      };
      'derivative': {
        'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
        'screenSummary': {
          'playAreaStringProperty': LocalizedStringProperty;
          'interactionHintStringProperty': LocalizedStringProperty;
        }
      };
      'integral': {
        'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
        'screenSummary': {
          'playAreaStringProperty': LocalizedStringProperty;
          'interactionHintStringProperty': LocalizedStringProperty;
        }
      };
      'advanced': {
        'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
        'screenSummary': {
          'playAreaStringProperty': LocalizedStringProperty;
          'interactionHintStringProperty': LocalizedStringProperty;
        }
      };
      'lab': {
        'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
        'screenSummary': {
          'playAreaStringProperty': LocalizedStringProperty;
          'interactionHintStringProperty': LocalizedStringProperty;
        }
      }
    };
    'slopeOfTangentAccordionBox': {
      'accessibleHelpTextCollapsedStringProperty': LocalizedStringProperty;
      'accessibleParagraph': {
        'zeroStringProperty': LocalizedStringProperty;
        'positiveStringProperty': LocalizedStringProperty;
        'negativeStringProperty': LocalizedStringProperty;
      }
    };
    'netSignedAreaAccordionBox': {
      'accessibleHelpTextCollapsedStringProperty': LocalizedStringProperty;
      'accessibleParagraph': {
        'zeroStringProperty': LocalizedStringProperty;
        'positiveStringProperty': LocalizedStringProperty;
        'negativeStringProperty': LocalizedStringProperty;
      }
    };
    'checkboxGroup': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
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
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'gridCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'showPrimaryCurveCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'curveManipulationType': {
      'hillStringProperty': LocalizedStringProperty;
      'triangleStringProperty': LocalizedStringProperty;
      'pedestalStringProperty': LocalizedStringProperty;
      'parabolaStringProperty': LocalizedStringProperty;
      'sinusoidStringProperty': LocalizedStringProperty;
      'freeformStringProperty': LocalizedStringProperty;
      'tiltStringProperty': LocalizedStringProperty;
      'shiftStringProperty': LocalizedStringProperty;
    };
    'graphAreas': {
      'defaults': {
        'accessibleList': {
          'leadingParagraphStringProperty': LocalizedStringProperty;
          'coordinateGridShownStringProperty': LocalizedStringProperty;
          'valuesLabeledOnAxesStringProperty': LocalizedStringProperty;
        }
      };
      'primary': {
        'accessibleHeadingStringProperty': LocalizedStringProperty;
        'accessibleList': {
          'primaryCurve': {
            'continuousAndDifferentiableStringProperty': LocalizedStringProperty;
            'hasDiscontinuitiesStringProperty': LocalizedStringProperty;
            'hasCuspsStringProperty': LocalizedStringProperty;
            'hasDiscontinuitiesAndCuspsStringProperty': LocalizedStringProperty;
            'hiddenStringProperty': LocalizedStringProperty;
          };
          'predictCurve': {
            'continuousAndDifferentiableStringProperty': LocalizedStringProperty;
            'hasDiscontinuitiesStringProperty': LocalizedStringProperty;
            'hasCuspsStringProperty': LocalizedStringProperty;
            'hasDiscontinuitiesAndCuspsStringProperty': LocalizedStringProperty;
            'hiddenStringProperty': LocalizedStringProperty;
          }
        }
      };
      'integral': {
        'accessibleHeadingStringProperty': LocalizedStringProperty;
        'accessibleList': {
          'continuousStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        }
      };
      'derivative': {
        'accessibleHeadingStringProperty': LocalizedStringProperty;
        'accessibleList': {
          'continuousStringProperty': LocalizedStringProperty;
          'discontinuousStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        }
      };
      'secondDerivative': {
        'accessibleHeadingStringProperty': LocalizedStringProperty;
        'accessibleList': {
          'continuousStringProperty': LocalizedStringProperty;
          'discontinuousStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        }
      }
    };
    'curveManipulatorAndSettingsStringProperty': LocalizedStringProperty;
    'curveActionsButtonGroup': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'smoothButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponse': {
        'allCurvesStringProperty': LocalizedStringProperty;
        'predictCurveStringProperty': LocalizedStringProperty;
      }
    };
    'eraserButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponse': {
        'primaryCurveStringProperty': LocalizedStringProperty;
        'predictCurveStringProperty': LocalizedStringProperty;
      }
    };
    'undoButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponse': {
        'primaryCurveStringProperty': LocalizedStringProperty;
        'predictCurveStringProperty': LocalizedStringProperty;
      }
    };
    'yZoomButtonGroup': {
      'zoomInButton': {
        'accessibleName': {
          'integralStringProperty': LocalizedStringProperty;
          'derivativeStringProperty': LocalizedStringProperty;
          'secondDerivativeStringProperty': LocalizedStringProperty;
        };
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'zoomOutButton': {
        'accessibleName': {
          'integralStringProperty': LocalizedStringProperty;
          'derivativeStringProperty': LocalizedStringProperty;
          'secondDerivativeStringProperty': LocalizedStringProperty;
        };
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      }
    };
    'predictRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'primaryCurveRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'predictCurveRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      }
    };
    'curveManipulationTypeRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'graphSetRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'integralPrimaryRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'primaryDerivativeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'integralPrimaryDerivativeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'primaryDerivativeSecondDerivativeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      }
    };
    'variableRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'xRadioButton': {
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'tRadioButton': {
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      }
    };
    'notationRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'lagrangeRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'leibnizRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      }
    };
    'discontinuitiesRadioButtonGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'noLineRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'dashedLineRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      }
    };
    'shapeWidthSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'predictToggleSwitch': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'curveVisibilityToggleButton': {
      'accessibleNameOn': {
        'integralStringProperty': LocalizedStringProperty;
        'primaryStringProperty': LocalizedStringProperty;
        'derivativeStringProperty': LocalizedStringProperty;
        'secondDerivativeStringProperty': LocalizedStringProperty;
      };
      'accessibleNameOff': {
        'integralStringProperty': LocalizedStringProperty;
        'primaryStringProperty': LocalizedStringProperty;
        'derivativeStringProperty': LocalizedStringProperty;
        'secondDerivativeStringProperty': LocalizedStringProperty;
      };
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseOffStringProperty': LocalizedStringProperty;
      'accessibleContextResponseOnStringProperty': LocalizedStringProperty;
    };
    'curveManipulators': {
      'defaults': {
        'accessibleObjectResponse': {
          'focusedReleasedStringProperty': LocalizedStringProperty;
          'focusedGrabbedStringProperty': LocalizedStringProperty;
          'grabbedStringProperty': LocalizedStringProperty;
          'releasedStringProperty': LocalizedStringProperty;
          'movedReleasedStringProperty': LocalizedStringProperty;
          'movedGrabbedStringProperty': LocalizedStringProperty;
        };
        'accessibleRoleDescription': {
          'movableStringProperty': LocalizedStringProperty;
          'movableButtonStringProperty': LocalizedStringProperty;
        }
      };
      'primary': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'predict': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'explorationTools': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleObjectResponse': {
        'xPhrase': {
          'minStringProperty': LocalizedStringProperty;
          'maxStringProperty': LocalizedStringProperty;
          'otherStringProperty': LocalizedStringProperty;
        }
      }
    };
    'referenceLine': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponse': {
        'patterns': {
          'primaryDerivativeStringProperty': LocalizedStringProperty;
          'integralPrimaryStringProperty': LocalizedStringProperty;
          'integralPrimaryDerivativeStringProperty': LocalizedStringProperty;
          'primaryDerivativeSecondDerivativeStringProperty': LocalizedStringProperty;
        };
        'primaryPhrase': {
          'predictAndPrimaryStringProperty': LocalizedStringProperty;
          'predictUndefinedStringProperty': LocalizedStringProperty;
          'predictValueStringProperty': LocalizedStringProperty;
          'predictHiddenStringProperty': LocalizedStringProperty;
          'primaryUndefinedStringProperty': LocalizedStringProperty;
          'primaryValueStringProperty': LocalizedStringProperty;
          'primaryHiddenStringProperty': LocalizedStringProperty;
        };
        'integralPhrase': {
          'integralValueStringProperty': LocalizedStringProperty;
          'integralHiddenStringProperty': LocalizedStringProperty;
        };
        'derivativePhrase': {
          'derivativeUndefinedStringProperty': LocalizedStringProperty;
          'derivativeValueStringProperty': LocalizedStringProperty;
          'derivativeHiddenStringProperty': LocalizedStringProperty;
        };
        'secondDerivativePhrase': {
          'secondDerivativeUndefinedStringProperty': LocalizedStringProperty;
          'secondDerivativeValueStringProperty': LocalizedStringProperty;
          'secondDerivativeHiddenStringProperty': LocalizedStringProperty;
        }
      }
    };
    'tangentTool': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponse': {
        'patternStringProperty': LocalizedStringProperty;
        'slopePhrase': {
          'zeroStringProperty': LocalizedStringProperty;
          'positiveStringProperty': LocalizedStringProperty;
          'negativeStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        };
        'derivativePhrase': {
          'derivativeValueStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        }
      }
    };
    'areaUnderCurveTool': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponse': {
        'patternStringProperty': LocalizedStringProperty;
        'integralPhrase': {
          'integralValueStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        };
        'areaPhrase': {
          'zeroStringProperty': LocalizedStringProperty;
          'positiveStringProperty': LocalizedStringProperty;
          'negativeStringProperty': LocalizedStringProperty;
          'hiddenStringProperty': LocalizedStringProperty;
        }
      }
    }
  }
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
