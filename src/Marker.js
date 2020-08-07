import React from 'react';
import { loadModules } from 'react-arcgis';

export default class Marker extends React.Component {
  componentDidMount() {
    const { latitude, longitude } = this.props.position;
    loadModules(['esri/Graphic'])
      .then(([Graphic]) => {
        // Add the geometry and symbol to a new graphic
        const graphic = new Graphic({
          geometry: {
            type: 'point', // auto-casts as new Point()
            longitude,
            latitude,
          },
          popupTemplate: {
            content: [
              {
                type: 'fields',
                fieldInfos: [
                  {
                    fieldName: 'address',
                    label: this.props.address,
                    visible: true,
                  },
                  {
                    type: 'text',
                    fieldName: 'description',
                    label: this.props.description,
                    visible: true,
                  },
                ],
              },
            ],
            title: this.props.title,
          },
          symbol: {
            type: 'simple-marker', // auto-casts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
              // auto-casts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 2,
            },
          },
        });

        this.setState({ graphic });
        this.props.view.graphics.add(graphic);
      })
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    this.props.view.graphics.remove(this.state.graphic);
  }
  render() {
    return null;
  }
}
