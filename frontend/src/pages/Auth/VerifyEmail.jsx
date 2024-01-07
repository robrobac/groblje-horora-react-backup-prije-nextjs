import React, { useEffect, useState } from 'react'
import { VerifyEmailContainer, VerifyEmailWrap, VerifyMessageWrap } from './Auth.styled'
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { VerificationButtons } from '../../components/buttons/Buttons.styled';
import GhostSpinner from '../../components/ghostSpinner/GhostSpinner';
import { handleLogout } from '../../hooks/useAuthCheck';

export default function VerifyEmail() {
    document.body.classList.add('loading');
    const [verificationResent, setVerificationResent] = useState(false)
    const [sendingVerification, setSendingVerification] = useState(false)

    const resendVerification = async () => {
        setSendingVerification(true)
        try {
            await sendEmailVerification(auth.currentUser);
            setSendingVerification(false)
            setVerificationResent(true);
            console.log('verification mail sent')
        } catch (err) {
            console.log(err)
            setSendingVerification(false)
            setVerificationResent(false);
        }
    }

    const handleVerificationLogout = async () => {
        await handleLogout()
        document.body.classList.remove('loading');
    }

    const handleRefresh = async () => {
        window.location.reload();
    }

    return (
        <VerifyEmailContainer>
            <VerifyMessageWrap>
                <h5>
                    Molim vas da potvrdite
                    <br></br>
                    svoju email adresu.
                </h5>
                
                
                <p><i>Ako ne vidite email s linkom za potvrdu, pogledajte spam folder ili zatražite novu potvrdu.</i></p>

                

                <VerificationButtons style={{minWidth: '210px', minHeight: '50px'}} onClick={resendVerification}>
                    {verificationResent ? 'Nova potvrda poslana' : (sendingVerification ? <GhostSpinner/> : 'Ponovno posalji email')}
                </VerificationButtons>
                <p>Nakon sto povrdite email adresu, osvježite stranicu ili kliknite na "potvrdio sam email"</p>
                <VerificationButtons style={{backgroundColor: 'green'}} onClick={handleRefresh}>
                        Potvrdio sam email
                    </VerificationButtons>
                <VerificationButtons onClick={handleVerificationLogout}>Odjavi se</VerificationButtons>   
            </VerifyMessageWrap>
        </VerifyEmailContainer>
    )
}
