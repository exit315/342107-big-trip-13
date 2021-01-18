import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          dateBegin: new Date(point.date_from),
          dateEnd: new Date(point.date_to),
          price: point.base_price,
          pointType: {
            offers: point.offers,
            typeOfPoint: point.type
          },
          destination: {
            title: point.destination.name,
            photos: point.destination.pictures
          },
          isFavorite: point.is_favorite
        }
    );
    
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.offers;
    delete adaptedPoint.type;
    delete adaptedPoint.name;
    delete adaptedPoint.pictures;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "date_from": point.dateBegin instanceof Date ? point.dateBegin.toISOString() : null,
          "date_to": point.dateEnd instanceof Date ? point.dateEnd.toISOString() : null,
          "base_price": point.price,
          "offers": point.pointType.offers,
          "type": point.pointType.typeOfPoint,
          "destination.name": point.destination.title,
          "destination.pictures": point.destination.photos,
          "is_favorite": point.isFavorite
        }
    );

    delete adaptedPoint.dateBegin;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.price;
    delete adaptedPoint.pointType.offers;
    delete adaptedPoint.pointType.typeOfPoint;
    delete adaptedPoint.destination.title;
    delete adaptedPoint.destination.photos;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
