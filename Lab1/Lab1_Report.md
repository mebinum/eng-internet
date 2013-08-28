# SWEN90002 - Engineering for Internet Applications
### Lab Week 1
### Group 5
### Oyemike Ebinum - 526250
### Venkatesh Yeluri - 655009


1. Drawbacks of using network address translation, as
opposed to using a unique IP address.
    - One of the main issues with using NAT is that some protocols that have an IP address as part of their package might not work in a network with NAT e.g FTP, X windowing systems, IPSEC.
    - In some situations there is a need for a remote system to initiate a connection with a client being a NAT connection, this is a bit harder to do with NAT as opposed to having a unique IP address.
    - In order to faciliate some of the connections not possible via NAT, workarounds need to be put in place which can cause performance degradation.
2. See code files
3. Java Refresher
 - What is the purpose of the timeout argument?
 *Time out argument is to set the maximum length the function should try reaching the address before giving up.* 
 -If an IOException is thrown by isReachable, what would be an appropriate action to take and why?

 - You should catch the error using a try/catch and print out or send back a message to inform the user/client that the hostname/address they entered cannot be reached. You should do this because the program might need to contact the server down the line.
 - Outputs for inputs "localhost,
www.unimelb.edu.au, yahoo.com, google.com"
        * Found: localhost=127.0.0.1 and is reachable
        * Found: www.unimelb.edu.au=128.250.148.40 and is not reachable
        * Found: yahoo.com=98.139.183.24 and is not reachable
        * Found: google.com=220.244.223.88 and is not reachable

4. div tag is used as a page divider for html web pages, it is used to create sections or blocks of content on a web page. A span tag is used to group a section of text. Key difference between both are divs create blocks of content while a span is an inline element, also spans can be found in divs but divs should not be nested in spans

