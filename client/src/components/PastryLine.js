import React, {useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DeleteButton from './DeleteButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { updatePastry, createPastry } from '../redux/reducers/pastrySlice'


const PastryLine = ({pastry, isNew, closeAddLine}) => {
  const [isEditMode, setIsEditMode] = useState(isNew);
  const [editedPastry, setEditedPastry] = useState({ ...pastry,  ingredients: (pastry.ingredients || []) });
  const dispatch = useDispatch();



  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };


  const handleInputChange = (event) => {
    setEditedPastry({
      ...editedPastry,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit= () => {
    dispatch(updatePastry({ id: pastry._id, pastryData: editedPastry }))
    .then(() => {
      setIsEditMode(false);
    })
    .catch((error) => {
      console.error("Error updating pastry:", error);
    });
  
  }

  const handleCreate= () => {

    dispatch(createPastry({...editedPastry}))
    .then(() => {
      setIsEditMode(false);
      closeAddLine();
    })
    .catch((error) => {
      console.error("Error updating pastry:", error);
    });
  
  }




  const handleIngredientChange = (index, event) => {
    const newIngredients = [...editedPastry.ingredients];
    newIngredients[index][event.target.name] = event.target.value;
    setEditedPastry({ ...editedPastry, ingredients: newIngredients });
  };

  // Add a new ingredient
  const addIngredient = () => {
    const newIngredients = [...editedPastry.ingredients, { name: '', quantity: '', unit: '' }];
    setEditedPastry({ ...editedPastry, ingredients: newIngredients });
  };

  // Remove an ingredient
  const removeIngredient = (index) => {
    const newIngredients = [...editedPastry.ingredients];
    newIngredients.splice(index, 1);
    setEditedPastry({ ...editedPastry, ingredients: newIngredients });
  };

  return (
    <tr className="border-b bg-gray-50 border-gray-200">
    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
      {!isNew &&
      <>{isEditMode? <CloseIcon onClick={toggleEditMode}  /> : <EditIcon onClick={toggleEditMode} />}</> 
      }
    </td>
    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
      {isEditMode?
       <TextField
       name="name"
       value={editedPastry.name}
       onChange={handleInputChange}
       variant="outlined"
       size="small"
     />
      : <>{pastry.name}</>}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    {isEditMode?
       <TextField
       name="price"
       value={editedPastry.price}
       onChange={handleInputChange}
       variant="outlined"
       size="small"
       type="number"
     />
      : <>{pastry.price}</>}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <div className="flex flex-col">
      {isEditMode?
       <TextField
       name="imageUrl"
       value={editedPastry.imageUrl}
       onChange={handleInputChange}
       variant="outlined"
       size="small"
     />
      : <><img className="h-10 w-10" src={pastry?.imageUrl} alt={`${pastry?.name}`}  /></>}
      </div>
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    {isEditMode?
       <TextField
       name="quantity"
       value={editedPastry?.quantity}
       onChange={handleInputChange}
       variant="outlined"
       size="small"
       type="number"
     />
      : <>{pastry?.quantity}</>}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    {isEditMode ? (
          <div>
             {editedPastry.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <TextField
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  label="Name"
                  size="small"
                />
                <TextField
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  label="Quantity"
                  type="number"
                  size="small"
                />
                <TextField
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                  label="Unit"
                  size="small"
                />
                <button onClick={() => removeIngredient(index)}>Remove</button>
              </div>
            ))}
            <button onClick={addIngredient}>Add Ingredient</button>
          </div>
        ) : (
          <ul>
            {pastry.ingredients.map((ingredient, index) => (
              <li key={index}>{`${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`}</li>
            ))}
          </ul>
        )}
    </td>

    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {isEditMode && !isNew  && <button onClick={handleSubmit}>Submit</button>}
      {!isEditMode && !isNew &&  <DeleteButton id={pastry?._id} />}
      {isEditMode && isNew  && <button onClick={handleCreate}>Create</button>}
    </td>
    <div></div>
  </tr>
  )
}

export default PastryLine