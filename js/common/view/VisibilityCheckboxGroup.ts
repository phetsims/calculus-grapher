// Copyright 2022, University of Colorado Boulder

/**
 * VisibilityCheckboxGroup is a group of checkboxes for controlling visibility of graph nodes
 *
 * @author Martin Veillette
 */

import { Text } from '../../../../scenery/js/imports.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherViewProperties from './CalculusGrapherViewProperties.js';

type SelfOptions = {
  isGraphCheckboxIncluded?: {
    integralGraph: boolean;
    derivativeGraph: boolean;
    secondDerivativeGraph: boolean;
  };
};

export type VisibilityCheckboxGroupOptions = SelfOptions & VerticalCheckboxGroupOptions;

export default class VisibilityCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( viewProperties: CalculusGrapherViewProperties,
                      providedOptions: VisibilityCheckboxGroupOptions ) {

    const options = optionize<VisibilityCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()(
      {
        isGraphCheckboxIncluded: {
          integralGraph: true,
          derivativeGraph: true,
          secondDerivativeGraph: false
        }
      }, providedOptions );


    // content array for checkbox items
    const items: VerticalCheckboxGroupItem[] = [];

    if ( options.isGraphCheckboxIncluded.integralGraph ) {

      // Integral checkbox
      const integralItem = createItem(
        CalculusGrapherStrings.checkbox.integralStringProperty,
        viewProperties.integralGraphNodeVisibleProperty, {
          tandemName: 'integralGraphNodeCheckbox'
        } );

      items.push( integralItem );
    }

    if ( options.isGraphCheckboxIncluded.derivativeGraph ) {

      // First Derivative checkbox
      const derivativeItem = createItem(
        CalculusGrapherStrings.checkbox.derivativeStringProperty,
        viewProperties.derivativeGraphNodeVisibleProperty, {
          tandemName: 'derivativeGraphNodeCheckbox'
        } );

      items.push( derivativeItem );
    }

    if ( options.isGraphCheckboxIncluded.secondDerivativeGraph ) {

      // Second Derivative checkbox
      const secondDerivativeItem = createItem(
        CalculusGrapherStrings.checkbox.secondDerivativeStringProperty,
        viewProperties.secondDerivativeGraphNodeVisibleProperty, {
          tandemName: 'secondDerivativeGraphNodeCheckbox'
        } );

      items.push( secondDerivativeItem );
    }

    super( items, options );
  }
}

type ItemOptions = PickRequired<VerticalCheckboxGroupItem, 'tandemName'> & PickOptional<VerticalCheckboxGroupItem, 'options'>;

function createItem( labelStringProperty: TReadOnlyProperty<string>,
                     property: Property<boolean>,
                     providedOptions: ItemOptions ): VerticalCheckboxGroupItem {

  return {
    createNode: tandem => {
      return new Text( labelStringProperty, { tandem: tandem.createTandem( 'labelText' ) } );
    },
    property: property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'VisibilityCheckboxGroup', VisibilityCheckboxGroup );
