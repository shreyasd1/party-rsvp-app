import React from 'react'

const CollegeForm = () => {
    return (
        <div className="invite-section">
          <h1>College Form</h1>
          <form >
            <input type="text" placeholder="Name" name="name" />
            <input type="text" placeholder="City" name="city" />
            <input type="text" placeholder="University" name="university" />
            <input type="text" placeholder="Phone" name="phone" />
            <input type="text" placeholder="Email" name="email" />
            <input type="Password" placeholder="Password" name="password" />
            <input type="submit" value="Add College" className="btn" />
          </form>
        </div>
      )
}

export default CollegeForm
