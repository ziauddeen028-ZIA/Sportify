import React from "react";

export default function Footer() {
    return (<div>
        
        <footer className="flex justify-evenly  mt-19  bg-[#552d6e] text-[#ffe9ff] p-5">
            <hr/>
            <div className="one ">
                <p >Links<br /> Home  <br /> Shop <br /> Categories <br /> About <br /> Contact</p>
            </div>

            <div className="two">
               <p > <span >Customer Support</span> <br />FAQs <br /> Returns <br />Shipping <br /> Track Order <br /></p>
            </div>

            <div className="three">
              <p >  <span >Contact</span><br /> sportify@email.com <br /> +91-XXXX-XXXXXX <br /></p>
            </div>

            <div className="four">
               <p><span > Follow Us</span><br />[Instagram] <br /> [Facebook] <br />[Twitter] <br />[YouTube] <br /></p>
            </div>

        </footer>
        <p className="text-center  bg-[#552d6e] text-[#ffe9ff] hover:text-[#00c9b2] pb-5"> © 2026 Sportify. All rights reserved. | Privacy Policy | Terms</p>
    </div>);

}
