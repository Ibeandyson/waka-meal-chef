import React from 'react';

export default function SubCategoryNav(props) {
    return (
        <div>
            <div
                className="modal fade"
                id="subCategoryNav"
                tabindex="-1"
                role="dialog"
                aria-labelledby="subCategoryNav"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/create-sub-category')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Create Sub Category
                            </button>
                            <hr />
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/sub-category-list')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                               Sub  Category List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
