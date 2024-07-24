import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from "axios";


function App() {
  const [isModal, setOpen] = useState(false);
  const [isUpdate, setUpdateTrigger] = useState(true);
  const [itemsData, setItemsData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    datetime: "",
    file: null,
  })
  const [formBody, setFormBody] = useState(null);

  // Is going to close modal window 
  const handleClose = () => {
    setOpen(false);
  };
 
  // Is going to open modal window 
  const handleOpen =() => {
    setOpen(true);
  };

  // Is going to updating formdata 
  const handleChange = (e) => {
    if (e.target.name === 'file') {
      formData.file = e.target.files[0]
      setFormData(formData)
    } else if (e.target.name === 'username') {
      formData.username = e.target.value
      setFormData(formData)
    } else if (e.target.name === 'date') {
      formData.datetime = e.target.value
      setFormData(formData)
    }

  }

  // Is going to get all data from server
  const handleUpdate = () => {
    axios.get('/api/results/')
        .then(response => {
            setItemsData(response.data); // Save the data in state  
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    setUpdateTrigger(false)
  };

  // Send a delete request and update list for user 
  const deletionSubmit = (item) => {
    axios.delete(`/api/results/${item.id}/`)
      .then((res) => setUpdateTrigger(true));
    handleClose()
  }

  // Paste in modal window delete form 
  const deleteItem = (item) => {
    handleOpen();
    setFormBody(
    <div className='flex flex-col justify-between h-full gap-9'>
      <b className='flex w-full justify-center text-lg'>
        DELETE ITEM
      </b>  
      <div className='flex w-full justify-center'>
        Are you sure ?
      </div>
      <div className='flex w-full justify-center gap-2'>
        <button onClick={ () => deletionSubmit(item) } className='bg-slate-200 pl-3 pr-3 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform'>Yes</button>
        <button onClick={handleClose} className='bg-slate-200 pl-3 pr-3 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform'>No</button>
      </div>
    </div>)
  };
  
  // Send a post request with form data to create a new record in database
  const creationSubmit = (form_el) =>{
    form_el.preventDefault()

    var form_data = new FormData();
    form_data.append("user", formData.username)
    form_data.append("time_created", formData.datetime)
    form_data.append("file", formData.file)

    // Use the fetch API to send the form data to the server  
    axios.post('/api/results/', form_data)
    .then(data => {
        console.log('Success:', data);
        setUpdateTrigger(true)
    })
    .catch(error => {
        console.error('Error:', error);
    });

    handleClose()
  };

  // Paste in modal window create form 
  const createItem = () => {
    handleOpen();
    
    setFormBody( 
      <div>
        <b className='flex w-full justify-center text-lg'>
          ADD NEW ITEM
        </b>  
        <div className='flex w-full justify-around g-4'>
          <form className='forma flex flex-col gap-3' onSubmit={creationSubmit} encType="multipart/form-data">
              <input type="text" name="username" placeholder="Name" onChange={handleChange}/>
              <input type="datetime-local" name="date" placeholder="Time" onChange={handleChange}/>
              <input type="file" name="file" placeholder="File" onChange={handleChange}/>
              <button className='flex justify-end' type="submit">
                <div className='bg-slate-200 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform pl-3 pr-3'>
                  Submit
                </div>
              </button>
          </form>
        </div>
      </div>
    )
  };
  
  // Send a put request with form data to change existing a record in database 
  const editingSubmit = (form_el) => {
    console.log(form_el)
    form_el.preventDefault()

    var form_data = new FormData();
    form_data.append("user", formData.username)
    form_data.append("time_created", formData.datetime)
    form_data.append("file", formData.file)

    // Use the fetch API to send the form data to the server  
    axios.put(`/api/results/${form_el.target.id}/`, form_data)
    .then(data => {
        console.log('Success:', data);
        setUpdateTrigger(true)
    })
    .catch(error => {
        console.error('Error:', error);
    });

    handleClose()
  }

  // Paste in modal window edit form 
  const editItem = (item) => {
    handleOpen();
    setFormBody( 
      <div>
        <b className='flex w-full justify-center text-lg'>
          EDIT ITEM
        </b>  
        <div className='flex w-full justify-around g-4'>
          <form id={item.id} className='flex flex-col gap-3' onSubmit={editingSubmit}>
              <input type="text" name="username" defaultValue={item.user}  onChange={handleChange} />
              <input type="datetime-local" name="date" defaultValue={item.time_created}  onChange={handleChange} />
              <input type="file" name="file" placeholder='File'  onChange={handleChange}/>
              <button className='flex justify-end' type="submit">
                <div className='bg-slate-200 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform pl-3 pr-3'>
                  Submit
                </div>
              </button>
          </form>
        </div>
      </div>)
  };

  // Updating list of items when isUpdate is changed 
  useEffect(handleUpdate, [isUpdate]);

  return (
    <div className="p-10 flex flex-col gap-7 ">
      <header className="flex flex-row ">
        <div onClick={createItem} className="pt-2 pb-2 pl-3 pr-3 border-2 rounded hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform">Add new item</div>
      </header>
      <main className=" flex flex-col flex-auto flex-wrap gap-2">
      {/* Place for a list of displaying items  */}
      {itemsData ? (itemsData.map((item) => (
        <div className="flex flex-row pl-4 h-8 border-2 rounded bg-amber-100">
          <div className="flex-grow">
            {item.user+'__'+item.file}
          </div>
          <div className="flex">
            <div onClick={()=> editItem(item)} className="bg-slate-200 pl-3 pr-3 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform">Edit</div>
            <div onClick={()=> deleteItem(item)} className="bg-orange-300 pl-3 pr-3 hover:bg-orange-50 active:scale-150 hover:cursor-pointer transition-transform">Delete</div>
          </div>
        </div>
      ))) : (<p>Loading...</p>)
      }
      </main>
      {/* Place for modal window */}
      <Modal isOpen={isModal} onClose={handleClose} children={formBody}>
      </Modal>
    </div>
  );
}

export default App;
