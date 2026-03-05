// Copyright 2026, University of Colorado Boulder

/**
 * GraphAreaDescriber is the base class for accessible lists that describe Graph Areas.
 * It handles the parts of the accessible list that are common to all Graph Areas.
 *
 * Note most of the code and PhET-iO API use the term "Graph", while core description uses "Graph Area".
 * Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import type { AccessibleTemplateValue } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';

export default abstract class GraphAreaDescriber {

  private readonly gridVisibleProperty: TReadOnlyProperty<boolean>;

  protected constructor( gridVisibleProperty: TReadOnlyProperty<boolean> ) {
    this.gridVisibleProperty = gridVisibleProperty;
  }

  /**
   * Gets the accessible template that describes the graph area.
   */
  public abstract getAccessibleTemplate(): TReadOnlyProperty<AccessibleTemplateValue>;

  /**
   * Gets the list item that describes the coordinate grid.
   */
  protected getCoordinateGridListItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.coordinateGridShownStringProperty,
      visibleProperty: this.gridVisibleProperty
    };
  }

  /**
   * Gets the list item that describes the values on the axes.
   */
  protected getValuesListItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.valuesLabeledOnAxesStringProperty,
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    };
  }
}

calculusGrapher.register( 'GraphAreaDescriber', GraphAreaDescriber );