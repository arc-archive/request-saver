/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   request-saver.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../app-pouchdb/pouchdb.d.ts" />
/// <reference path="../events-target-behavior/events-target-behavior.d.ts" />
/// <reference path="../uuid-generator/uuid-generator.d.ts" />

declare namespace LogicElements {

  /**
   * An element that is responsible for saving request and project data.
   *
   * ### Example
   *
   * ```html
   * <head>
   *    <link rel="import" href="bower_components/request-saver/request-saver.html">
   * </head>
   * <body>
   *    <request-saver></request-saver>
   * </body>
   * ```
   *
   * ## Event API
   *
   * Send `save-request-data` custom event in boundaries of the `eventsTarget` property
   * to create or update request object. Dispatched event should be cancelable so
   * other instances of the same element won't try to update it at the same time.
   *
   * The event handler expects to receive `request` and `opts` properties on the
   * event's `detail` object. The `request` property is required. Both properies are
   * passed to `overrideRequest(request, opts)` or `saveRequest(request, opts)` functions.
   *
   * The function to use is determined by presence of the `_id` proprty on the
   * `request` object. If `_id` is not set then `saveRequest` function is used.
   *
   * Handler for the event creates a new property on the `detail` object: `result`.
   * It is a result of calling any of the functions. It is always a promise that
   * resolves to updated request.
   *
   * ## Google Drive save action
   *
   * This element do not support Drive save action. Instead it sends `drive-request-save`
   * cancelable event to query for an element that can perform this operation.
   * If the event is handled (cancelled and `result` property set on detail object)
   * then it waits until the `result` resolves the promise. Otherwise it
   * prints warning mesage to the console and continue process.
   *
   * Changes in version 2
   *
   * - `drive-request-save` event renamed to `export-google-drive`
   */
  class RequestSaver extends
    ArcBehaviors.EventsTargetBehavior(
    Polymer.Element) {

    /**
     *  PouchDB's handler to the saved requests database.
     */
    readonly _requestDb: any;

    /**
     *  PouchDB's handler to the projects database.
     */
    readonly _projectDb: any;
    readonly _uuid: any;
    disconnectedCallback(): void;
    _attachListeners(node: any): void;
    _detachListeners(node: any): void;

    /**
     * Handler for the `save-request-data` event.
     */
    _saveRequestHandler(e: any): void;

    /**
     * Creates a legacy project object in the datastore.
     *
     * @param name Name of the project
     * @returns Promise resolved to the project object with `_id` and
     * `_rev` properties from the PouchDB.
     */
    createLegacyProject(name: String|null): Promise<any>|null;

    /**
     * Updates request object.
     * It has to contain at least the `_id` property. If `_rev` is not set
     * then it checks for existing object. If the object for given ID exists
     * it is updated. Otherwise new object is created.
     *
     * @param data Object to save / update.
     * @returns Resolved promise to a request object with `_id` and
     * `_rev`
     */
    updateRequest(data: object|null, originalId: any, originalRev: any): Promise<any>|null;

    /**
     * Deletes a request for given `id`.
     *
     * @param id Request ID
     * @returns Resolved promise when save operation complete.
     */
    deleteRequest(id: String|null): Promise<any>|null;

    /**
     * Overrides existing request with new information.
     *
     * @param data Data to update. See `saveRequest()` for options.
     * @returns Promise resolved to updated object.
     */
    overrideRequest(data: object|null, opts: any): Promise<any>|null;

    /**
     * Tests if request ID should change based on the properties that are part of the
     * request ID.
     *
     * It returns true if name, method or the URL has changed and are not set in
     * existing ID.
     *
     * @param data Request object.
     * @returns True if the ID if the request should be regenerated.
     */
    _idChangeRequired(data: object|null): Boolean|null;

    /**
     * Checks if request ID has to be changed. If the change is required then
     * it removes the object from the datastore and upodates the `data` object
     * with new ID.
     * This function do not saves the request data!
     *
     * @param data Request data
     * @param projectChanged True if project has been updated for this
     * request. Project update should be therefore called before this function.
     * @returns A promise resolved to the request object.
     */
    _changeRequestId(data: object|null, projectChanged: Boolean|null): Promise<any>|null;

    /**
     * Saves a request as new in the datastore.
     * `_rev` and `_id` is discarded.
     *
     * Note: The source `data` object will change!
     *
     * @param data Data to save.
     * @param opts Save options:
     * - projectId {String} Saves request to the following project ID. Note, do
     * not include new project ID to the `data` object since it is discarded.
     * - projectName {String} Creates a project for given name and associates
     * the request with the project by setting its ID. `projectId` takes
     * precedence over this property.
     * - drive {Boolean} Triggers Google Drive save flow.
     * @returns Resolved promise to a request object with `_id` and
     * `_rev`
     */
    saveRequest(data: object|null, opts: object|null): Promise<any>|null;

    /**
     * Generates a saved request datastore ID
     */
    _createRequestId(name: any, url: any, method: any, projectId: any): any;

    /**
     * Sets a project data on a request object for "save new" flow.
     * This function creates new project object if required.
     *
     * @param data Request object to be saved
     * @param opts Save options. See `saveRequest` for more info.
     * @returns Resolved promise to updated request object.
     */
    _requestProjectSetup(data: object|null, opts: object|null): Promise<any>|null;

    /**
     * Saves the request on Google Drive.
     * It sends `drive-request-save` event to call a component responsible
     * for saving the request.
     *
     * This do nothing if `opts.drive is not set.`
     *
     * @param data Data to save
     * @param opts Save request options. See `saveRequest` for more info.
     * @returns Resolved promise to updated object.
     */
    _saveGoogleDrive(data: object|null, opts: object|null): Promise<any>|null;

    /**
     * Prepares payload data to be stored in the datastore.
     * FormData are translated to a `multipart` entry property.
     * Payload is cleared from the request object.
     *
     * @returns Promise resolved to a request object.
     */
    _preparePayload(data: any): Promise<any>|null;

    /**
     * Computes `multipart` list value to replace FormData with array that can
     * be stored in the datastore.
     *
     * @param payload FormData object
     * @returns Promise resolved to a form part representation.
     */
    _createMultipartEntry(payload: FormData|null): Promise<any>|null;

    /**
     * Recuresively iterates over form data and appends result of creating the
     * part object to the `result` array.
     *
     * Each part entry contains `name` as a form part name, value as a string
     * representation of the value and `isFile` to determine is the value is
     * acttually a string or a file data.
     *
     * @param iterator FormData iterator
     * @param textParts From `_arcMeta` property. List of blobs
     * that should be treated as text parts.
     * @param result An array where the results are appended to.
     * It creates new result object when it's not passed.
     * @returns A promise resolved to the `result` array.
     */
    _computeFormDataEntry(iterator: Iterator|null, textParts: Array<String|null>|null, result: Array<object|null>|null): Promise<any>|null;

    /**
     * Converts blob data to base64 string.
     *
     * @param blob File or blob object to be translated to string
     * @returns Promise resolved to a base64 string data from the file.
     */
    _blobToString(blob: Blob|null): Promise<any>|null;
  }
}

interface HTMLElementTagNameMap {
  "request-saver": LogicElements.RequestSaver;
}
