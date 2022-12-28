// Copyright 2020-2022, University of Colorado Boulder

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
  'LagrangeStringProperty': LinkableProperty<string>;
  'LeibnizStringProperty': LinkableProperty<string>;
  'variableStringProperty': LinkableProperty<string>;
  'checkbox': {
    'areaUnderCurveStringProperty': LinkableProperty<string>;
    'tangentStringProperty': LinkableProperty<string>;
  };
  'barometer': {
    'areaUnderCurveStringProperty': LinkableProperty<string>;
    'slopeOfTangentStringProperty': LinkableProperty<string>;
  };
  'predictStringProperty': LinkableProperty<string>;
  'showStringProperty': LinkableProperty<string>;
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
