import React from 'react'
import styles from './style.module.css'
import Modal from 'react-modal';
import EditIcon from '../Group.svg'
import AllProductsModal from './AllProductsModal'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProductList = () => {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([{}]);
  const [showVariants, setShowVariants] = React.useState({});

  const toggleShowVariants = (index) => {
    setShowVariants((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function submitSelected(selected) {
    setSelected(selected);
    closeModal();
  }

  function addProduct() {
    setSelected([...selected, {}]);
  }

  return (
    <>
    <div className={styles.content}>

     <div className={styles.header}>
      Add Products 
    </div>
    
    <div className={styles.table}>
        <div>
            <div>
                <span className={styles.word}>
                  Product
                </span>
                <span className={styles.words}>
                  Discount
                </span>
            </div>
            {selected.map((item, index) => {
                return (
                  <>
                    <div key={index} className='flex list-box'>
                        <div className='border select-product flex'>
                          <span>{item.title ? item.title : 'Select Product'}</span>
                            <span onClick={openModal}><img  className='img' src={EditIcon}></img></span>
                        </div>
                        <div className="btn">
                            <button className='Discount'>Add Discount</button>
                            <div className='show-var' onClick={() => toggleShowVariants(index)}>
                              {showVariants[index] ? 'Hide variants' : 'Show variants'}&#9660;
                            </div>
                        </div>
                    </div>
                    {showVariants[index] && item.variants && item.variants.map((variant, index) => {
                        return (
                            <span key={index}>{variant.title}</span>
                        );
                    })}
                    </>
                );
            })}
            
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        > 
         <div className='MOdal-Heading'>
           <div className='selection'>Select Products</div>
          <button onClick={closeModal}>&times;</button>
          </div>

          <AllProductsModal closeModal={closeModal} submitSelected={submitSelected}/>
      </Modal>
    </div>



    <button onClick={addProduct} className={styles.button}>
        Add Product
    </button>


    </div>
    
    </>
   
  )
}

export default ProductList;





































// import React from 'react'
// import styles from './style.module.css'
// import Modal from 'react-modal';
// import EditIcon from '../Group.svg'
// import AllProductsModal from './AllProductsModal'
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// const ProductList = () => {

//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [selected, setSelected] = React.useState([{}]);
//   const [showVariants, setShowVariants] = React.useState({});

//   const toggleShowVariants = (index) => {
//     setShowVariants((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function submitSelected(selected) {
//     setSelected(selected);
//     closeModal();
//   }

//   function addProduct() {
//     setSelected([...selected, {}]);
//   }

//   return (
//     <>
//     <div >

//      <div className='products-one'>
//       Add Products 
//     </div>
    
//     <div >
//         <div>
//             <div>
//                 <span className='products-two'>
//                   Product
//                 </span>
//                 <span className='products-three'>
//                   Discount
//                 </span>
//             </div>
//             {selected.map((item, index) => {
//                 return (
//                   <>
//                     <div key={index} >
//                         <div className='products-four'>
//                             <span className='products-five'>{item.title ? item.title : 'Select Product'}
//                               <span onClick={openModal}><img  className='img-one' src={EditIcon}></img></span>
//                             </span>
//                         </div>
//                         <div>
//                             <button className='Discount'>Add Discount</button>
//                             <div onClick={() => toggleShowVariants(index)}>
//                               {showVariants[index] ? 'Hide variants' : 'Show variants'}
//                             </div>
//                         </div>
//                     </div>
//                     {showVariants[index] && item.variants && item.variants.map((variant, index) => {
//                         return (
//                             <span key={index}>{variant.title}</span>
//                         );
//                     })}
//                     </>
//                 );
//             })}
            
//         </div>

//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           style={customStyles}
//           contentLabel="Example Modal"
//         > 
//          <div className='MOdal-Heading'>
//            <h3>Select Products</h3>
//           <button onClick={closeModal}>&times;</button>
//           </div>

//           <AllProductsModal closeModal={closeModal} submitSelected={submitSelected}/>
//       </Modal>
//     </div>



//     <button onClick={addProduct} className={styles.button}>
//         Add Product
//     </button>


//     </div>
    
//     </>
   
//   )
// }

// export default ProductList;
