import React, {component} from "react";

class Todo extends React.Component {
    state = {
        input : "",
        items : [],
        edit : {},
        error : "",
    }

    doInput = (v) =>{
        this.setState({
            input : v.target.value,
        })
    }

    ToDo = (e) =>{
        e.preventDefault();

        if(this.state.edit.id){
            const itemsBaru = {
                input : this.state.input,id:this.generateId()
            };
            const cariIndex = this.state.items.findIndex((i_item)=>{
                return i_item.id === this.state.edit.id;
            })
            console.log(cariIndex);
            const cloneItems = [...this.state.items];
            console.log(cloneItems);
            cloneItems[cariIndex] = itemsBaru;
            // this.setState({
            //     input : "",
            //     edit : {},
            // })
            console.log(cloneItems[cariIndex]);
            
            if(this.state.input !== ""){
                this.setState({
                    items : cloneItems,
                    error : "",
                    input : "",
                    edit : {},
                })    
            }else{
                this.setState({
                    error : "Error, isi data untuk edit dulu!",
                })
            }

        }else{  
            if(this.state.items.length < 10){

                if(this.state.input !== ""){
    
                    this.setState({
                        items : [...this.state.items, {input:this.state.input,id : this.generateId(), done : false}],
                        input : "",  
                        error : "",
                    })
                }else{
                    this.setState({
                        error : "Error, data di isi dulu!",
                    })
                }
            }else{
                alert("data kepenuhan");
            }
           
        }
        
    }
    
    generateId=()=>{
        return Date.now();
    }
    hapusBtn = (idhapus)=>{
        const filterD = this.state.items.filter((d)=>{
            return d.id !== idhapus;
        })
        // console.log(filterD);
        this.setState({
            items : filterD,
        })
    }
    editBtn = (d)=>{
        this.setState({
            input : d.input,
            edit : d,
            error : "",
        })
    }
    Cancel = () =>{
        this.setState({
            input : "",
            edit : {},
            error : "",
        })
    }
    updateCheck = (d) => {
        const updateItems = {
            ...d,
            done : d.done ? false : true,
        }
        console.log(updateItems);

        const cariIndex = this.state.items.findIndex((indexItems)=>{
            return indexItems.id == d.id;
        })
        const cloneItems = [...this.state.items];
        cloneItems[cariIndex] = updateItems;
        this.setState({
            items : cloneItems,
        })
    }
    
    render(){
        console.log("data Edit :",this.state.edit);
        return(
            <div className="box">
            <h1>To Do List</h1>
            <p style={{position:"relative",bottom:"10%"}}> Data : {this.state.items.length}</p>
            <div className="inptData">
                <input className="inpt1" type="text" onChange={((inpt)=>this.doInput(inpt))} value={this.state.input} placeholder="Isi Data ..."/>
                <h6 style={{position:"absolute",top:"-2.5rem",color:"tomato",textShadow:"none"}}>{this.state.error}</h6>
                {this.state.edit.id ? (<button className="btnAdd" onClick={this.ToDo}>Edit</button>) : (<button className="btnAdd" onClick={this.ToDo}>Add</button>)}
                
                {this.state.edit.id && <button className="btnAdd" onClick={this.Cancel}>Cancel</button>}
                
            </div>

            {this.state.items.length > 0 ? (
                this.state.items.map((d)=>{
                    return(
                        <ol>
                            {d.done && <li style={{float:"right",position:"absolute", right:"7rem",color:"green"}}>Done</li>}
                            <li>{d.input}</li>
                            <button className="btn2" onClick={this.hapusBtn.bind(this, d.id)}>delete</button>
                            <button className="btn" onClick={this.editBtn.bind(this,d)}>edit</button>
                            {/* <input className="cekbox" type="checkbox" onClick={this.check} checked={this.state.check} onChange={(()=>"")} style={{float:"right"}}/> */}
                            <input className="cekbox" type="checkbox" onChange={this.updateCheck.bind(this,d)} style={{float:"right"}} value={this.state.items.done}/>
                        </ol>
                    )
                })
            ) : ("Data Masing Kosong")}
            
            </div>
        )
    }
}

export default Todo;