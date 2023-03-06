// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ReferenceLineCheckbox from './ReferenceLineCheckbox.js';
import GridCheckbox from './GridCheckbox.js';

export default class CalculusGrapherCheckboxGroup extends VBox {

  public constructor( gridVisibleProperty: Property<boolean>, referenceLineVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const referenceLineCheckbox = new ReferenceLineCheckbox( referenceLineVisibleProperty,
      tandem.createTandem( 'referenceLineCheckbox' ) );

    const gridCheckbox = new GridCheckbox( gridVisibleProperty, tandem.createTandem( 'gridCheckbox' ) );

    super( {
      children: [ referenceLineCheckbox, gridCheckbox ],
      align: 'left',
      spacing: 10,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
