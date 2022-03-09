// import { Button, Checkbox, FormControl, FormErrorMessage, HStack, Input, Stack } from '@chakra-ui/react';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';

// import { createShift } from '../actions/shifts';


// export default function AddShift() {
//   const {
//     handleSubmit,
//     register,
//     formState: { errors, isSubmitting },
//   } = useForm();


//   const displayName = useSelector((state) => state.business.nameForTags);
//   const dispatch = useDispatch();

//   function onSubmit(values) {
//     dispatch(createTag(values));
//     console.log(values);
//   }

//   onChangeStartTime(e) {
//     console.log(e.target);
//     this.setState({
//       startTime: e.target.value,
//     });
//     console.log(this.state.startTime);
//   }
//   onChangeEndTime(e) {
//     console.log(e.target);
//     this.setState({
//       endTime: e.target.value,
//     });
//     console.log(this.state.endTime);
//   }

//   onChangeRolesNeeded(e) {
//     console.log(e.target);
//     this.setState({
//       rolesNeeded: e.target.value,
//     });
//     console.log(this.state.rolesNeeded);
//   }

//   saveShift() {
//     const { name, startTime } = this.state;

//     this.props
//       .createShift(name, startTime)
//       .then((data) => {
//         this.setState({
//           id: data.id,
//           name: data.name,
//           startTime: data.startTime,
//           active: data.active,

//           submitted: true,
//         });
//         console.log(data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   newShift() {
//     this.setState({
//       id: null,
//       name: '',
//       startTime: '',
//       active: false,

//       submitted: false,
//     });
//   }

//   render() {
//     return (
//       <div className='submit-form'>
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className='btn btn-success' onClick={this.newShift}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className='form-group'>
//               <Stack spacing={4} direction='column'>
//                 <InputGroup>
//                   <Input type='text' placeholder='name ' value={this.state.name} onChange={this.onChangeName} />
//                 </InputGroup>
//                 <InputGroup>
//                   <Input type='time' placeholder='startTime ' value={this.state.startTime} onChange={this.onChangeStartTime} />
//                   <Input type='time' placeholder='endTime ' value={this.state.endTime} onChange={this.onChangeEndTime} />
//                 </InputGroup>

//                 <InputGroup size='sm'>
//                   <Stack spacing={5} direction='row'>
//                     <Checkbox value={this.state.blockedDays} onChange={this.onChangeBlockedDays} defaultChecked>
//                       Mon
//                     </Checkbox>
//                     <Checkbox defaultChecked>Tue</Checkbox>
//                     <Checkbox defaultChecked>Wed</Checkbox>
//                     <Checkbox defaultChecked>Thu</Checkbox>
//                     <Checkbox defaultChecked>Fri</Checkbox>
//                     <Checkbox defaultChecked>Sat</Checkbox>
//                     <Checkbox defaultChecked>Sun</Checkbox>
//                   </Stack>
//                 </InputGroup>
//                 <InputGroup size='sm'>
//                   <Stack spacing={5} direction='row'>
//                     <Checkbox value={this.state.rolesNeeded} onChange={this.onChangeRolesNeeded} defaultChecked>
//                       Barista
//                     </Checkbox>
//                     <Checkbox defaultChecked>Sandwich</Checkbox>
//                     <Checkbox defaultChecked>Admin</Checkbox>
//                   </Stack>
//                 </InputGroup>
//               </Stack>
//             </div>

//             {/* <div className='form-group'>
//               <label htmlFor='startTime'>StartTime</label>
//               <input
//                 type='radio'
//                 className='form-control'
//                 id='startTime'
//                 required
//                 value={this.state.startTime}
//                 onChange={this.onChangeStartTime}
//                 name='startTime'
//               />
//             </div> */}

//             <button onClick={this.saveShift} className='btn btn-success'>
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default connect(null, { createShift })(AddShift);
