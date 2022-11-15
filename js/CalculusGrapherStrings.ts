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
    'advancedStringProperty': LinkableProperty<string>;
    'labStringProperty': LinkableProperty<string>;
    'derivativeStringProperty': LinkableProperty<string>;
    'integralStringProperty': LinkableProperty<string>;
  };
  'smoothStringProperty': LinkableProperty<string>;
  'symbol': {
    'dStringProperty': LinkableProperty<string>;
    'fStringProperty': LinkableProperty<string>;
    'xStringProperty': LinkableProperty<string>;
    'tStringProperty': LinkableProperty<string>;
  };
  'discontinuitiesStringProperty': LinkableProperty<string>;
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
