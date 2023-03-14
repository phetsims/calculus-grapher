// Copyright 2020-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import calculusGrapher from './calculusGrapher.js';

type StringsType = {
  'calculus-grapher': {
    'titleStringProperty': LinkableProperty<string>;
  };
  'screen': {
    'derivativeStringProperty': LinkableProperty<string>;
    'integralStringProperty': LinkableProperty<string>;
    'advancedStringProperty': LinkableProperty<string>;
    'labStringProperty': LinkableProperty<string>;
  };
  'smoothStringProperty': LinkableProperty<string>;
  'symbol': {
    'dStringProperty': LinkableProperty<string>;
    'fStringProperty': LinkableProperty<string>;
    'xStringProperty': LinkableProperty<string>;
    'tStringProperty': LinkableProperty<string>;
  };
  'discontinuitiesStringProperty': LinkableProperty<string>;
  'valuesStringProperty': LinkableProperty<string>;
  'notationStringProperty': LinkableProperty<string>;
  'lagrangeStringProperty': LinkableProperty<string>;
  'leibnizStringProperty': LinkableProperty<string>;
  'variableStringProperty': LinkableProperty<string>;
  'checkbox': {
    'areaUnderCurveStringProperty': LinkableProperty<string>;
    'tangentStringProperty': LinkableProperty<string>;
  };
  'barometer': {
    'netSignedAreaStringProperty': LinkableProperty<string>;
    'slopeOfTangentStringProperty': LinkableProperty<string>;
  };
  'predictStringProperty': LinkableProperty<string>;
  'showStringProperty': LinkableProperty<string>;
  'predictPreferenceStringProperty': LinkableProperty<string>;
  'valuesPreferenceDescriptionStringProperty': LinkableProperty<string>;
  'predictPreferenceDescriptionStringProperty': LinkableProperty<string>;
  'referenceLineStringProperty': LinkableProperty<string>;
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
