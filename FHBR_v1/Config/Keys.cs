using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FHBR_v1.Config
{
    public class Keys
    {
        // To do: update the connection string with the DNS name
        // or IP address of your server. 
        //For example, "mongodb://testlinux.cloudapp.net
        private static string userName = "bfce352c-0ee0-4-231-b9ee";
        private static string host = "bfce352c-0ee0-4-231-b9ee.documents.azure.com";
        private static string password = "ivoANcld0qR3xIRDo0Hvn7OcaiAOaIDgEFLW3mEcWCcO6IOCKIQdwpIm06tRS1DZyGOg6LIUPfcWIQYJe7R87g==";

        public static string UserName { get => userName; set => userName = value; }
        public static string Host { get => host; set => host = value; }
        public static string Password { get => password; set => password = value; }
    }
}
