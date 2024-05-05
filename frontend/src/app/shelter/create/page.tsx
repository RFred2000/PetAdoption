'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import styles from './page.module.css'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Page() {

    const [error, setError] = useState<string>()
    const router = useRouter()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        debugger;

        event.preventDefault()
     
        const formData = new FormData(event.currentTarget);
        const formDataJson = Object.fromEntries(formData);

        const response = await fetch('/api/shelter/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formDataJson),
        })
        
        if (response.status === 201) {
            router.replace('/pets')
        }
        else {
            setError("Failed to create user")
        }
      }
     
      return (
        <div>
            {/* Signup Form */}
            <form onSubmit={onSubmit}>
                <div className={styles.signupForm}>
                    <div className={styles.formLabelColumn}>
                        <div className={styles.formLabel}>
                            <label>Shelter Name</label>
                        </div>
                        <div className={styles.formLabel}>
                            <label>Address Line 1</label>
                        </div>
                        <div className={styles.formLabel}>
                            <label>Address Line 2</label>
                        </div>
                        <div className={styles.formLabel}>
                            <label>Phone Number</label>
                        </div>
                        <div className={styles.formLabel}>
                            <label>Description</label>
                        </div>
                    </div>

                    <div className={styles.formInputColumn}>
                        <div className={styles.formInput}>
                            <input type="text" name="ShelterName" />
                        </div>
                        <div className={styles.formInput}>
                            <input type="text" name="AddressLine1" />
                        </div>
                        <div className={styles.formInput}>
                            <input type="text" name="AddressLine2" />
                        </div>
                        <div className={styles.formInput}>
                            <input type="text" name="PhoneNumber" />
                        </div>
                        <div className={styles.formInput}>
                            <textarea name="Description" rows={10} cols={40}/>
                        </div>
                    </div>
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Submit</button>
                </div>
            </form>

            {/* Error Message */}
            {error && 
                <p>{error}</p>
            }
        </div>


      )
}