## Generate Key Pair 
1. openssl ecparam -name brainpoolP256r1 -genkey -noout -out key.pem
2. openssl ec -in key.pem -pubout -out public.pem

* Check Curves
> openssl ecparam -list_curves