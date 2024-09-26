// Copyright 2020-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
/* @formatter:off */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
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
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
