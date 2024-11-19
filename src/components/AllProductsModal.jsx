
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Vector from "../Vector.svg";

const AllProductsModal = ({submitSelected, closeModal}) => {

    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);

    function convertData(data) {
        return data.map((item) => {
            item.checked = false;
            item.variants = item.variants.map((variant) => {
                variant.checked = false;
                return variant;
            });
            return item;
        });
    }
    const parentRefs = useRef({});

    useEffect(() => {
        let tempSelected = [];
        list.forEach((group) => {
            const allChecked = group.variants.every((child) => child.checked);
            const someChecked = group.variants.some((child) => child.checked);
            
            if (parentRefs.current[group.id]) {
              parentRefs.current[group.id].indeterminate = someChecked && !allChecked;
            }

            if(group.checked){
                tempSelected.push(group);
            } else {
                group.variants.forEach((child) => {
                    if(child.checked){
                        if(tempSelected.findIndex((item) => item.id === group.id) === -1){
                            tempSelected.push({
                                id: group.id,
                                title: group.title,
                                price: group.price,
                                variants: [child]
                            });
                        } else {
                            const index = tempSelected.findIndex((item) => item.id === group.id);
                            tempSelected[index].variants.push(child);
                        }
                    }
                });
            }
          });
            setSelectedProducts(tempSelected);
    }, [list]);

    useEffect(() => {
        setPage(1);
    }, [searchText]);

    const handleParentChange = (groupId) => {
        setList((prevTree) =>
          prevTree.map((group) => {
            if (group.id === groupId) {
              const newParentState = !group.checked;
              return {
                ...group,
                checked: newParentState,
                variants: group.variants.map((child) => ({
                  ...child,
                  checked: newParentState,
                })),
              };
            }
            return group;
          })
        );
      };
    
      const handleChildChange = (groupId, childId) => {
        setList((prevTree) =>
          prevTree.map((group) => {
            if (group.id === groupId) {
              const updatedChildren = group.variants.map((child) =>
                child.id === childId
                  ? { ...child, checked: !child.checked }
                  : child
              );
              const allChecked = updatedChildren.every((child) => child.checked);
    
              return {
                ...group,
                checked: allChecked,
                variants: updatedChildren,
              };
            }
            return group;
          })
        );
      };

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const paginatedProducts = () => {
        fetch(`https://stageapi.monkcommerce.app/task/products/search?limit=10&page=${page + 1}&search=${searchText}`, {
            method: "GET",
            headers: {
                "x-api-key": "72njgfa948d9aS7gs5",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if(data){
                    const result = convertData(data);
                    const updatedData = [...list, ...result]
                    setList(updatedData);
                    setPage(page + 1);
                    setHasMore(result.length > 0 ? true : false);
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
    fetch(`https://stageapi.monkcommerce.app/task/products/search?limit=10&page=${page}&search=${searchText}`, {
        method: "GET",
        headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const result = convertData(data);
            setList(result);
        })
        .catch((error) => console.log(error));
    }, [searchText]);
    return (
        <div className='modalWrapper'>
            <div className="Search"><img src={Vector} alt="Vector" /><input className='input' type="text" value={searchText} placeholder='Search Product' onChange={handleTextChange}/></div>
            <div className='scrollWrapper' id='scrollableWrapper'>
                <InfiniteScroll
                dataLength={list.length} //This is important field to render the next data
                next={paginatedProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableWrapper"
                >
                {list && list.map((group) => (
                        <div key={group.id} style={{borderBottom: '1px solid grey', paddingTop: "10px", paddingBottom: "10px"  }}>
                        <label>
                            <input
                            ref={(el) => (parentRefs.current[group.id] = el)} // Attach ref to parent checkbox
                            type="checkbox"
                            checked={group.checked}
                            onChange={() => handleParentChange(group.id)}
                            />
                            <span>{group.title}</span>
                        </label>
                        <div style={{ marginLeft: '20px' }}>
                            {group.variants.map((child) => (
                            <label key={child.id} style={{ display: 'block' }}>
                                <input
                                type="checkbox"
                                checked={child.checked}
                                onChange={() => handleChildChange(group.id, child.id)}
                                />
                                <span>{child.title}</span>
                            
                                <span className='child-price'>{child.price}</span>
                            </label>
                            ))}
                        </div>
                        </div>
                    ))
                    }
                </InfiniteScroll>
            </div>
            <div className='modal-actions'>
                <span>1 product selected</span>
                <button className='btn-one'>Cancel</button>
                <button className='btn-two' onClick={() => submitSelected(selectedProducts)}>Add</button>
            </div>
        </div>
    )
}

export default AllProductsModal;